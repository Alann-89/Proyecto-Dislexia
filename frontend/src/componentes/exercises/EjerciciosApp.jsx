import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Sparkles, Loader2 } from 'lucide-react';
import { AppContainer, Container, Card, Title, Text } from './styles';
import { EJERCICIOS_DATA } from './data';
import MenuEjercicios from './shared/MenuEjercicios';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

// Importa los ejercicios disponibles
import E01CazadorRimas from './activities/E01';
import E02SeparadorSilabas from './activities/E02';
import E03SonidosLetras from './activities/E03';
import E04PalabrasReales from './activities/E04';
import E05Ortografia from './activities/E05';
import E06LecturaCronometrada from './activities/E06';
import E07ComprensionActiva from './activities/E07';
import E08PrediccionTextual from './activities/E08';
import E09ConstruccionOraciones from './activities/E09';

export default function EjerciciosApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [vista, setVista] = useState('menu');
  const [ejercicioActual, setEjercicioActual] = useState(null);
  const [hasCompletedEvaluation, setHasCompletedEvaluation] = useState(false);
  const [resultadosIA, setResultadosIA] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);

  const [regenerando, setRegenerando] = useState(false);

  // 1. Cargar datos de la IA
  useEffect(() => {
    const userKey = user?.email ? `resultados_${user.email}` : 'resultados_guest';
    const resultadosPrevios = localStorage.getItem(userKey);

    // Cargar completados del localStorage (para que persista al recargar)
    const completedKey = user?.email ? `completed_${user.email}` : 'completed_guest';
    const storedCompleted = JSON.parse(localStorage.getItem(completedKey) || '[]');
    setCompletedIds(storedCompleted);

    if (resultadosPrevios) {
      setHasCompletedEvaluation(true);
      try { setResultadosIA(JSON.parse(resultadosPrevios)); } catch (e) { console.error(e); }
    } else {
      setHasCompletedEvaluation(false); // Aseguramos resetear si cambia de usuario
      setResultadosIA(null);
    }
  }, [user]);

  // 2. Detectar navegación desde Resultados
  useEffect(() => {
    // Si venimos de la página de resultados con un ejercicio específico...
    if (location.state && location.state.ejercicioId) {
      const id = location.state.ejercicioId;
      // Verificamos que el ejercicio exista y no haya sido completado ya
      if (EJERCICIOS_DATA[id] && !completedIds.includes(id)) {
        iniciarEjercicio(id);
        // Limpiamos el estado para que si recarga no vuelva a abrirlo
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, completedIds]);

  const iniciarEjercicio = (ejercicioId) => { setEjercicioActual(ejercicioId); setVista('ejercicio'); };
  const volverMenu = () => { setVista('menu'); setEjercicioActual(null); };
  const irAEvaluacion = () => { navigate('/'); };

  const finishExercise = (id) => {
    // Agregamos el ID a la lista de completados
    const newCompleted = [...completedIds, id];
    setCompletedIds(newCompleted);
    
    // Guardamos en localStorage
    const completedKey = user?.email ? `completed_${user.email}` : 'completed_guest';
    localStorage.setItem(completedKey, JSON.stringify(newCompleted));
    volverMenu();
  };

 

  const regenerarEjercicios = async () => {
    if (!hasCompletedEvaluation) return;

    // 1. Verificar si hay algo que regenerar
    if (completedIds.length === 0) {
      alert("¡Aún no has completado ningún ejercicio! Completa algunos para desbloquear nuevo contenido.");
      return;
    }

    try {
      // Obtenemos el ID del screening original
      const userKey = user?.email ? `resultados_${user.email}` : 'resultados_guest';
      const screeningData = JSON.parse(localStorage.getItem(userKey));
      
      if (!screeningData?.screening_id) {
        alert("Error: No hay ID de evaluación.");
        return;
      }

      // 2. ACTIVAR PANTALLA DE CARGA
      setRegenerando(true);

      // 3. LLAMAR A LA API CON LOS IDS BLOQUEADOS
      // Enviamos 'completedIds' para que la IA solo regenere esos
      const respuestaApi = await api.regenerarEjercicios(screeningData.screening_id, completedIds);

      const listaActualizada = respuestaApi.nuevos_ejercicios || [];

      // 4. ACTUALIZAR ESTADO
      const nuevosDatos = {
        ...screeningData,
        ejercicios_recomendados: listaActualizada
      };
      
      // Guardamos en localStorage
      localStorage.setItem(userKey, JSON.stringify(nuevosDatos));
      
      // 5. DESBLOQUEAR (Limpiar completedIds)
      // Solo limpiamos los que se regeneraron (en este caso, todos los completados)
      setCompletedIds([]);
      const completedKey = user?.email ? `completed_${user.email}` : 'completed_guest';
      localStorage.setItem(completedKey, JSON.stringify([]));
      
      setResultadosIA(nuevosDatos);
      
      // 6. DESACTIVAR CARGA (El usuario ya está en el menú)
      setRegenerando(false);

    } catch (error) {
      console.error(error);
      alert("Error al regenerar ejercicios.");
    }
  };

  const getDatosEjercicio = (id) => {
    const datosEsticos = EJERCICIOS_DATA[id];
    if (!datosEsticos) return null;
    
    let recomendacionIA = null;
    if (resultadosIA && Array.isArray(resultadosIA.ejercicios_recomendados)) {
        recomendacionIA = resultadosIA.ejercicios_recomendados.find(ex => ex.id_ejercicio === id);
    }

    if (recomendacionIA && recomendacionIA.contenido_generado) {
      return {
        ...datosEsticos,
        ...recomendacionIA.contenido_generado,
        descripcion: recomendacionIA.descripcion_corta || datosEsticos.descripcion
      };
    }
    return datosEsticos;
  };

  const renderEjercicio = () => {
    const data = getDatosEjercicio(ejercicioActual);
    if (!data) return <div>Ejercicio no encontrado</div>;
    const handleComplete = () => finishExercise(ejercicioActual);

    switch(ejercicioActual) {
      case 'E01': return <E01CazadorRimas ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E02': return <E02SeparadorSilabas ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E03': return <E03SonidosLetras ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E04': return <E04PalabrasReales ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E05': return <E05Ortografia ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E06': return <E06LecturaCronometrada ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E07': return <E07ComprensionActiva ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E08': return <E08PrediccionTextual ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      case 'E09': return <E09ConstruccionOraciones ejercicio={data} onVolver={volverMenu} onComplete={handleComplete} />;
      
      default: return (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '20px' }}>
          <h2>🚧 En construcción</h2>
          <p>Este ejercicio estará disponible pronto.</p>
          <button 
            onClick={volverMenu}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#2980B9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Volver
          </button>
        </div>
      );
    }
  };

  if (regenerando) {
    return (
      <AppContainer>
        <Container>
          <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div className="animate-spin"> {/* Asegúrate de tener esta clase o usa style */}
                 <Loader2 size={64} color="#6DD5FA" style={{ animation: 'spin 1s linear infinite' }} />
                 <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
              
              <div>
                <Title style={{ fontSize: '1.8rem' }}>Creando nuevos desafíos...</Title>
                <Text>La Inteligencia Artificial está diseñando ejercicios únicos para ti.</Text>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Sparkles size={24} color="#f59e0b" />
                <span style={{ color: '#4b5563', fontWeight: '500' }}>Adaptando dificultad...</span>
              </div>
            </div>
          </Card>
        </Container>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Container>
        {vista === 'menu' ? (
          <MenuEjercicios 
            onIniciar={iniciarEjercicio} 
            onIrEvaluacion={irAEvaluacion}
            hasCompletedEvaluation={hasCompletedEvaluation}
            onRegenerar={regenerarEjercicios}
            completedIds={completedIds}
            resultadosIA={resultadosIA}
          />
        ) : (
          renderEjercicio()
        )}
      </Container>
    </AppContainer>
  );
}