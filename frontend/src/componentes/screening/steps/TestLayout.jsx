import React from 'react';
import { Headphones, Brain, BookOpen, Pencil, CheckCircle } from 'lucide-react';
import {
  Container,
  Card,
  ProgressContainer,
  ProgressHeader,
  ProgressLabel,
  ProgressBar,
  ProgressFill,
  ModuleGrid,
  ModuleCard,
  ModuleLabel,
  FlexContainer,
  IconWrapper
} from '../styles';

// Importa los componentes de los módulos
import ModuloA from '../modules/ModuloA';
import ModuloB from '../modules/ModuloB';
import ModuloC from '../modules/ModuloC';
import ModuloD from '../modules/ModuloD';

export default function TestLayout({
  perfil,
  resultados,
  setResultados,
  moduloActual,
  setModuloActual,
  onComplete,
  getNivelLectura
}) {
  
  const modulos = [
    { 
      componente: ( // <-- CORREGIDO
        <ModuloA
          resultados={resultados}
          setResultados={setResultados}
          onComplete={() => setModuloActual(1)}
        />
      ),
      titulo: 'Módulo A: Conciencia Fonológica',
      icono: Headphones
    },
    { 
      componente: ( // <-- CORREGIDO
        <ModuloB
          resultados={resultados}
          setResultados={setResultados}
          onComplete={() => setModuloActual(2)}
        />
      ),
      titulo: 'Módulo B: Reconocimiento de Palabras',
      icono: Brain
    },
    { 
      componente: ( // <-- CORREGIDO
        <ModuloC
          getNivelLectura={getNivelLectura}
          resultados={resultados}
          setResultados={setResultados}
          onComplete={() => setModuloActual(3)}
        />
      ),
      titulo: 'Módulo C: Fluidez Lectora',
      icono: BookOpen
    },
    { 
      componente: ( // <-- CORREGIDO
        <ModuloD
          resultados={resultados}
          setResultados={setResultados}
          onComplete={onComplete} // El último módulo llama a 'onComplete' global
        />
      ),
      titulo: 'Módulo D: Ortografía',
      icono: Pencil
    }
  ];

  const moduloActualData = modulos[moduloActual];
  const IconoActual = moduloActualData.icono;

  return (
    <Container>
      <Card>
        <ProgressContainer>
          <ProgressHeader>
            <ProgressLabel>Progreso General</ProgressLabel>
            <ProgressLabel>{moduloActual + 1} de {modulos.length}</ProgressLabel>
          </ProgressHeader>
          <ProgressBar>
            <ProgressFill $progress={((moduloActual + 1) / modulos.length) * 100} />
          </ProgressBar>
        </ProgressContainer>

        <ModuleGrid>
          {modulos.map((mod, idx) => {
            const IconoMod = mod.icono;
            return (
              <ModuleCard
                key={idx}
                $active={idx === moduloActual}
                $completed={idx < moduloActual}
              >
                <IconoMod />
                <ModuleLabel>Módulo {String.fromCharCode(65 + idx)}</ModuleLabel>
                {idx < moduloActual && <CheckCircle style={{ marginTop: '4px' }} />}
              </ModuleCard>
            );
          })}
        </ModuleGrid>

        <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '32px' }}>
          <FlexContainer $gap="12px" style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <IconWrapper $size="32px" $color="#2980B9">
              <IconoActual />
            </IconWrapper>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{moduloActualData.titulo}</h2>
          </FlexContainer>
          
          {moduloActualData.componente}
        </div>
      </Card>
    </Container>
  );
}