import React, { useState } from 'react';
import { Home, Star, CheckCircle, XCircle } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, ButtonGrid, FeedbackBox 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E05Ortografia({ ejercicio, onVolver, onComplete }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);

  const handleRespuesta = (opcion) => {
    const pregunta = ejercicio.preguntas[preguntaActual];
    const esCorrecta = opcion === pregunta.correcta;

    setFeedback({ correcto: esCorrecta, respuesta: opcion });
    
    if (esCorrecta) {
      setPuntos(puntos + 10);
    }

    setTimeout(() => {
      if (preguntaActual < ejercicio.preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setFeedback(null);
      } else {
        setFinalizado(true);
      }
    }, 1500);
  };

  if (finalizado) {
    return <ResultadoFinal puntos={puntos} total={ejercicio.preguntas.length * 10} onVolver={onComplete || onVolver} />;
  }

  const pregunta = ejercicio.preguntas[preguntaActual];

  return (
    <Card>
      <Button $variant="secondary" onClick={onVolver} $margin="0 0 20px 0">
        <Home size={20} /> Volver al Menú
      </Button>

      <Subtitle>{ejercicio.titulo}</Subtitle>
      <ProgressBar>
        <ProgressFill $progress={((preguntaActual + 1) / ejercicio.preguntas.length) * 100} />
      </ProgressBar>

      <ScoreDisplay>
        <Star /> {puntos} puntos
      </ScoreDisplay>

      <QuestionCard $bgColor="#fff7ed" $borderColor="#f97316">
        <div style={{ fontSize: '6rem', marginBottom: '24px' }}>{pregunta.imagen}</div>
        <Text style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#9a3412' }}>
          ¿Cuál está correctamente escrita?
        </Text>
      </QuestionCard>

      <ButtonGrid $cols={2}>
        {pregunta.opciones.map((opcion, idx) => (
          <Button
            key={idx}
            $large
            onClick={() => handleRespuesta(opcion)}
            disabled={feedback !== null}
            style={{ background: '#f97316' }}
          >
            {opcion}
          </Button>
        ))}
      </ButtonGrid>

      {feedback && (
        <FeedbackBox $success={feedback.correcto}>
          {feedback.correcto ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {feedback.correcto ? '¡Perfecto!' : `No, la correcta es "${pregunta.correcta}"`}
        </FeedbackBox>
      )}
    </Card>
  );
}