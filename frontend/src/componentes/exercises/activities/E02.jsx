import React, { useState } from 'react';
import { Home, Star, CheckCircle, XCircle } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, WordCard, ButtonGrid, FeedbackBox 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E02SeparadorSilabas({ ejercicio, onVolver, onComplete }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);

  const pregunta = ejercicio.preguntas[preguntaActual];
  const opciones = pregunta.opciones || [1, 2, 3, 4];
  const respuestaCorrecta = pregunta.correcta !== undefined ? pregunta.correcta : pregunta.respuesta;

  const handleRespuesta = (num) => {
    const esCorrecta = num === respuestaCorrecta;

    setFeedback({ correcto: esCorrecta, respuesta: num });
    
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

      <QuestionCard $bgColor="#f0fdf4" $borderColor="#10b981">
        <Text style={{ fontSize: '1.125rem', marginBottom: '16px' }}>
          ¿Cuántas sílabas tiene?
        </Text>
        <WordCard style={{ borderColor: '#10b981', color: '#10b981' }}>
          {pregunta.palabra}
        </WordCard>
      </QuestionCard>

      <ButtonGrid $cols={4}>
        {opciones.map((num, idx) => (
          <Button
            key={idx}
            $large
            $variant="success"
            onClick={() => handleRespuesta(num)}
            disabled={feedback !== null}
          >
            {num}
          </Button>
        ))}
      </ButtonGrid>

      {feedback && (
        <FeedbackBox $success={feedback.correcto}>
          {feedback.correcto ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {feedback.correcto ? '¡Correcto!' : `No, tiene ${respuestaCorrecta} sílabas`}
        </FeedbackBox>
      )}
    </Card>
  );
}