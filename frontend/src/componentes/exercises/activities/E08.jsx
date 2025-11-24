import React, { useState } from 'react';
import { Home, Star, CheckCircle, XCircle } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, ButtonGrid, FeedbackBox 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E08PrediccionTextual({ ejercicio, onVolver, onComplete }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);

  const handleRespuesta = (opcion) => {
    const oracion = ejercicio.oraciones[preguntaActual];
    const esCorrecta = opcion === oracion.correcta;

    setFeedback({ correcto: esCorrecta });
    
    if (esCorrecta) {
      setPuntos(puntos + 10);
    }

    setTimeout(() => {
      if (preguntaActual < ejercicio.oraciones.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setFeedback(null);
      } else {
        setFinalizado(true);
      }
    }, 1500);
  };

  if (finalizado) {
    return <ResultadoFinal puntos={puntos} total={ejercicio.oraciones.length * 10} onVolver={onComplete || onVolver} />;
  }

  const oracion = ejercicio.oraciones[preguntaActual];

  return (
    <Card>
      <Button $variant="secondary" onClick={onVolver} $margin="0 0 20px 0">
        <Home size={20} /> Volver al Menú
      </Button>

      <Subtitle>{ejercicio.titulo}</Subtitle>
      <ProgressBar>
        <ProgressFill $progress={((preguntaActual + 1) / ejercicio.oraciones.length) * 100} />
      </ProgressBar>

      <ScoreDisplay>
        <Star /> {puntos} puntos
      </ScoreDisplay>

      <QuestionCard $bgColor="#fef3c7" $borderColor="#f59e0b">
        <Text style={{ fontSize: '1.125rem', marginBottom: '16px' }}>
          Completa la oración:
        </Text>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#92400e',
          marginBottom: '24px',
          lineHeight: '1.6'
        }}>
          {oracion.texto}
        </div>
      </QuestionCard>

      <ButtonGrid $cols={3}>
        {oracion.opciones.map((opcion, idx) => (
          <Button
            key={idx}
            $large
            onClick={() => handleRespuesta(opcion)}
            disabled={feedback !== null}
            style={{ background: '#f59e0b' }}
          >
            {opcion}
          </Button>
        ))}
      </ButtonGrid>

      {feedback && (
        <FeedbackBox $success={feedback.correcto}>
          {feedback.correcto ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {feedback.correcto ? '¡Perfecto!' : `La palabra correcta es "${oracion.correcta}"`}
        </FeedbackBox>
      )}
    </Card>
  );
}