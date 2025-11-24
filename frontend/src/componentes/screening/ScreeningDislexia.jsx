import React, { useState } from 'react';

// Importa los pasos
import BienvenidaStep from './steps/BienvenidaStep';
import PerfilStep from './steps/PerfilStep';
import TestLayout from './steps/TestLayout';
import AnalizandoStep from './steps/AnalizandoStep';
import ResultadosStep from './steps/ResultadosStep';

// Importa los estilos
import { AppContainer } from './styles';

// IMPORTAR LA API
import { api } from '../../services/api';

// IMPORTA useAuth
import { useAuth } from '../../context/AuthContext';

export default function ScreeningDislexia() {
  const { user } = useAuth();

  const [paso, setPaso] = useState('bienvenida');
  const [perfil, setPerfil] = useState({ edad: '', escolaridad: '' });
  const [resultados, setResultados] = useState({});
  const [analisisIA, setAnalisisIA] = useState(null);
  const [moduloActual, setModuloActual] = useState(0);

  // --- AYUDANTES Y MANEJADORES ---

  const getNivelLectura = () => {
    const edad = parseInt(perfil.edad);
    if (edad <= 9) return '7-9';
    if (edad <= 12) return '10-12';
    return 'adulto';
  };

  const handleBienvenida = () => setPaso('perfil');

  const handlePerfil = () => {
    if (perfil.edad && perfil.escolaridad) {
      setPaso('test');
      setModuloActual(0);
    }
  };

  const handleReset = () => {
    setPaso('bienvenida');
    setPerfil({ edad: '', escolaridad: '' });
    setResultados({});
    setAnalisisIA(null);
    setModuloActual(0);
  };

  const enviarAnalisis = async (resultadosFinales) => {
    setPaso('analizando');
    setResultados(resultadosFinales);

    try {
      // Llamamos a tu backend real
      const respuesta = await api.analizar(perfil, resultadosFinales);

      // Fusionamos el ID del screening con el objeto de análisis
      const datosAGuardar = {
        ...respuesta.analisis,
        screening_id: respuesta.screening_id
      };

      const userKey = user?.email ? `resultados_${user.email}` : 'resultados_guest';
      localStorage.setItem(userKey, JSON.stringify(datosAGuardar));

      // Al hacer un nuevo test, borramos el progreso de "completados"
      const completedKey = user?.email ? `completed_${user.email}` : 'completed_guest';
      localStorage.removeItem(completedKey); // O localStorage.setItem(completedKey, '[]');
      
      // La respuesta del backend trae el análisis en respuesta.analisis
      setAnalisisIA(respuesta.analisis); 
      setPaso('resultados');

    } catch (error) {
      console.error("Falló el análisis:", error);
      alert("Hubo un error al conectar con el servidor de IA. Por favor intenta de nuevo.");
      setPaso('test'); // Opcional: regresar al usuario
    }
  };

  // --- RENDERIZADO CONDICIONAL ---

  const renderCurrentStep = () => {
    switch (paso) {
      case 'bienvenida':
        return <BienvenidaStep onNext={handleBienvenida} />;
      
      case 'perfil':
        return (
          <PerfilStep
            perfil={perfil}
            setPerfil={setPerfil}
            onNext={handlePerfil}
            onBack={() => setPaso('bienvenida')}
          />
        );
      
      case 'test':
        return (
          <TestLayout
            perfil={perfil}
            resultados={resultados}
            setResultados={setResultados}
            moduloActual={moduloActual}
            setModuloActual={setModuloActual}
            onComplete={enviarAnalisis}
            getNivelLectura={getNivelLectura}
          />
        );
      
      case 'analizando':
        return <AnalizandoStep />;
        
      case 'resultados':
        return (
          <ResultadosStep
            analisisIA={analisisIA}
            perfil={perfil}
            resultados={resultados}
            onReset={handleReset}
          />
        );
        
      default:
        return <BienvenidaStep onNext={handleBienvenida} />;
    }
  };

  return (
    <AppContainer>
      {renderCurrentStep()}
    </AppContainer>
  );
}