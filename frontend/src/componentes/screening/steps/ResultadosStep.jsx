import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Brain, AlertCircle, Home } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import {
  Container,
  Card,
  IconWrapper,
  Title,
  Text,
  ResultCard,
  ResultTitle,
  GridContainer,
  ExerciseCard,
  ExerciseNumber,
  ExerciseContent,
  ExerciseTitle,
  ExerciseDescription,
  ExerciseLink,
  AlertBox,
  Button,
  Badge
} from '../styles';
import { generarReportePDF } from '../../../services/pdfGenerator';

export default function ResultadosStep({ analisisIA, perfil, resultados, onReset }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!analisisIA) return null;

  const irAlEjercicio = (id) => {
    navigate('/ejercicios', { state: { ejercicioId: id } });
  };

  const nombreUsuario = user?.nombre || 'Invitado';

  // Seleccionamos solo los ejercicios marcados como prioritarios por la IA
  // Si por alguna razón no hay marcas, tomamos los primeros 4 como fallback
  const ejerciciosRecomendados = React.useMemo(() => {
    if (!analisisIA.ejercicios_recomendados) return [];
    
    const prioritarios = analisisIA.ejercicios_recomendados.filter(e => e.es_prioritario);
    
    if (prioritarios.length > 0) {
      return prioritarios.slice(0, 4); // Aseguramos máximo 4
    }
    return analisisIA.ejercicios_recomendados.slice(0, 4); // Fallback
  }, [analisisIA]);

  return (
    <Container>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
          <Button 
            $variant="secondary" 
            onClick={onReset}
            style={{ padding: '8px 16px', fontSize: '1rem' }}
          >
            <Home size={18} style={{ marginRight: '8px' }} /> Volver al Inicio
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <IconWrapper $size="80px" $color="#6DD5FA" $margin="0 auto 16px">
            <CheckCircle />
          </IconWrapper>
          <Title>Tu Perfil de Habilidades</Title>
          <Text $align="center">Resultados y recomendaciones personalizadas</Text>
        </div>

        <ResultCard $bgColor="linear-gradient(135deg, #2980B9 0%, #6DD5FA 100%)" style={{ color: 'white', border: 'none' }}>
          <ResultTitle $color="white" style={{ marginTop: 0 }}>Tu Perfil</ResultTitle>
          <Text $color="white" $mb="0" $size="1.125rem">{analisisIA.perfil_identificado}</Text>
        </ResultCard>

        <GridContainer $columns="repeat(2, 1fr)">
          <ResultCard $bgColor="#f0fdf4" $borderColor="#10b981">
            <ResultTitle $color="#065f46">
              <CheckCircle /> Áreas de Fortaleza
            </ResultTitle>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {analisisIA.areas_fortaleza.map((area, idx) => (
                <li key={idx} style={{ marginBottom: '8px', color: '#374151' }}>{area}</li>
              ))}
            </ul>
          </ResultCard>

          <ResultCard $bgColor="#fff7ed" $borderColor="#f97316">
            <ResultTitle $color="#9a3412">
              <Brain /> Áreas para Mejorar
            </ResultTitle>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {analisisIA.areas_a_practicar.map((area, idx) => (
                <li key={idx} style={{ marginBottom: '8px', color: '#374151' }}>{area}</li>
              ))}
            </ul>
          </ResultCard>
        </GridContainer>

        <ResultCard $bgColor="#ffffff" $borderColor="#e5e7eb" style={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'relative', overflow: 'visible'}}>
          <Badge style={{ 
            background: '#0F3460',
            top: '-12px', 
            right: '20px' 
          }}>
            Interpretación IA
          </Badge>
          <ResultTitle>¿Qué significan estos resultados?</ResultTitle>
          <Text $mb="0">{analisisIA.explicacion_amigable}</Text>
        </ResultCard>

        <div style={{ marginTop: '32px' }}>
          <ResultTitle>Ejercicios Recomendados para Ti</ResultTitle>

         {ejerciciosRecomendados.map((ejercicio, idx) => (
            <ExerciseCard key={idx} onClick={() => irAlEjercicio(ejercicio.id_ejercicio)}>
              <ExerciseNumber>{idx + 1}</ExerciseNumber>
              <ExerciseContent>
                <ExerciseTitle>{ejercicio.titulo}</ExerciseTitle>
                <ExerciseDescription>{ejercicio.descripcion_corta}</ExerciseDescription>
                <ExerciseLink onClick={(e) => {e.stopPropagation();irAlEjercicio(ejercicio.id_ejercicio);}}>
                  Ir al ejercicio →
                </ExerciseLink>
              </ExerciseContent>
            </ExerciseCard>
          ))}
        </div>

        <AlertBox $bgColor="#fefce8" $borderColor="#f59e0b" style={{marginTop: '24px'}}>
          <AlertCircle color="#d97706" />
          <div>
            <h4 style={{ fontWeight: 'bold', color: '#92400e', marginBottom: '4px', marginTop: 0 }}>Nota Importante</h4>
            <Text $mb="0" $size="0.875rem">{analisisIA.aviso_profesional}</Text>
          </div>
        </AlertBox>

        <GridContainer $columns="repeat(2, 1fr)" $margin="32px 0 0 0">
          <Button $variant="secondary" $fullWidth onClick={() => generarReportePDF(perfil, resultados, analisisIA, nombreUsuario)}>
            Descargar Resultados PDF
          </Button>
          <Button $fullWidth onClick={onReset}>
            Realizar Nueva Evaluación
          </Button>
        </GridContainer>

        <details style={{ marginTop: '32px', background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600', color: '#374151' }}>
            Datos técnicos de la evaluación
          </summary>
          <pre style={{ marginTop: '16px', fontSize: '0.75rem', background: 'white', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
            {JSON.stringify({ perfil, resultados }, null, 2)}
          </pre>
        </details>
      </Card>
    </Container>
  );
}