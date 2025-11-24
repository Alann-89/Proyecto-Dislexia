import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, WordCard, ButtonGrid, FeedbackBox 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E01CazadorRimas({ ejercicio, onVolver, onComplete }) {
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
        <ArrowLeft size={20} /> Volver al Menú
      </Button>

      <Subtitle>{ejercicio.titulo}</Subtitle>
      <ProgressBar>
        <ProgressFill $progress={((preguntaActual + 1) / ejercicio.preguntas.length) * 100} />
      </ProgressBar>

      <ScoreDisplay>
        <Star /> {puntos} puntos
      </ScoreDisplay>

      <QuestionCard $bgColor="#eff6ff" $borderColor="#60a5fa">
        <Text style={{ fontSize: '1.125rem', marginBottom: '16px' }}>
          ¿Qué palabra rima con:
        </Text>
        <WordCard>{pregunta.palabra}</WordCard>
      </QuestionCard>

      <ButtonGrid $cols={2}>
        {pregunta.opciones.map((opcion, idx) => (
          <Button
            key={idx}
            $large
            onClick={() => handleRespuesta(opcion)}
            disabled={feedback !== null}
          >
            {opcion}
          </Button>
        ))}
      </ButtonGrid>

      {feedback && (
        <FeedbackBox $success={feedback.correcto}>
          {feedback.correcto ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {feedback.correcto ? '¡Correcto!' : `No, la respuesta correcta es "${pregunta.correcta}"`}
        </FeedbackBox>
      )}
    </Card>
  );
}