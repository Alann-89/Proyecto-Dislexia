import React, { useState } from 'react';
import { Home, Star, CheckCircle, XCircle } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, FeedbackBox, OptionButton 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E07ComprensionActiva({ ejercicio, onVolver, onComplete }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [mostrarTexto, setMostrarTexto] = useState(true);

  const handleRespuesta = (opcion) => {
    const texto = ejercicio.textos[0];
    const pregunta = texto.preguntas[preguntaActual];
    const esCorrecta = opcion === pregunta.correcta;

    setFeedback({ correcto: esCorrecta });
    
    if (esCorrecta) {
      setPuntos(puntos + 10);
    }

    setTimeout(() => {
      if (preguntaActual < texto.preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setFeedback(null);
        setMostrarTexto(true);
      } else {
        setFinalizado(true);
      }
    }, 1500);
  };

  if (finalizado) {
    return <ResultadoFinal puntos={puntos} total={ejercicio.textos[0].preguntas.length * 10} onVolver={onComplete || onVolver} />;
  }

  const texto = ejercicio.textos[0];
  const pregunta = texto.preguntas[preguntaActual];

  return (
    <Card>
      <Button $variant="secondary" onClick={onVolver} $margin="0 0 20px 0">
        <Home size={20} /> Volver al Menú
      </Button>

      <Subtitle>{ejercicio.titulo}</Subtitle>
      <ProgressBar>
        <ProgressFill $progress={((preguntaActual + 1) / texto.preguntas.length) * 100} />
      </ProgressBar>

      <ScoreDisplay>
        <Star /> {puntos} puntos
      </ScoreDisplay>

      {mostrarTexto && (
        <div style={{
          background: '#f9fafb',
          padding: '24px',
          borderRadius: '12px',
          border: '2px solid #d1d5db',
          lineHeight: '1.8',
          fontSize: '1.125rem',
          marginBottom: '24px'
        }}>
          {texto.texto}
        </div>
      )}

      <QuestionCard $bgColor="#f0fdf4" $borderColor="#10b981">
        <Text style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#065f46' }}>
          {pregunta.pregunta}
        </Text>
      </QuestionCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {pregunta.opciones.map((opcion, idx) => (
          <OptionButton
            key={idx}
            onClick={() => {
              setMostrarTexto(false);
              handleRespuesta(opcion);
            }}
            disabled={feedback !== null}
          >
            {opcion}
          </OptionButton>
        ))}
      </div>

      {feedback && (
        <FeedbackBox $success={feedback.correcto}>
          {feedback.correcto ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {feedback.correcto ? '¡Excelente comprensión!' : `La respuesta correcta es "${pregunta.correcta}"`}
        </FeedbackBox>
      )}
    </Card>
  );
}