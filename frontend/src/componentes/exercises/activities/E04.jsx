import React, { useState, useEffect } from 'react';
import { Home, Star, CheckCircle, XCircle, Clock } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, WordCard, ButtonGrid, FeedbackBox 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E04PalabrasReales({ ejercicio, onVolver, onComplete }) {
  const [palabraActual, setPalabraActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());

  useEffect(() => {
    setTiempoInicio(Date.now());
  }, [palabraActual]);

  const handleRespuesta = (esReal) => {
    const palabra = ejercicio.palabras[palabraActual];
    const esCorrecta = esReal === palabra.esReal;
    const tiempoRespuesta = Date.now() - tiempoInicio;

    setFeedback({ correcto: esCorrecta, tiempo: tiempoRespuesta });
    
    if (esCorrecta) {
      // Bonus por velocidad (menos de 2 segundos)
      const bonus = tiempoRespuesta < 2000 ? 5 : 0;
      setPuntos(puntos + 10 + bonus);
    }

    setTimeout(() => {
      if (palabraActual < ejercicio.palabras.length - 1) {
        setPalabraActual(palabraActual + 1);
        setFeedback(null);
      } else {
        setFinalizado(true);
      }
    }, 1500);
  };

  if (finalizado) {
    return <ResultadoFinal puntos={puntos} total={ejercicio.palabras.length * 15} onVolver={onComplete || onVolver} />;
  }

  const palabra = ejercicio.palabras[palabraActual];

  return (
    <Card>
      <Button $variant="secondary" onClick={onVolver} $margin="0 0 20px 0">
        <Home size={20} /> Volver al Menú
      </Button>

      <Subtitle>{ejercicio.titulo}</Subtitle>
      <ProgressBar>
        <ProgressFill $progress={((palabraActual + 1) / ejercicio.palabras.length) * 100} />
      </ProgressBar>

      <ScoreDisplay>
        <Star /> {puntos} puntos
      </ScoreDisplay>

      <QuestionCard $bgColor="#faf5ff" $borderColor="#7c3aed">
        <Text style={{ fontSize: '1.125rem', marginBottom: '16px' }}>
          ¿Esta palabra existe en español?
        </Text>
        <WordCard style={{ borderColor: '#7c3aed', color: '#7c3aed', fontSize: '4rem' }}>
          {palabra.palabra}
        </WordCard>
        <Text style={{ fontSize: '0.875rem', color: '#7e22ce' }}>
          <Clock size={16} style={{ display: 'inline', marginRight: '4px' }} />
          Responde rápido para ganar bonus
        </Text>
      </QuestionCard>

      <ButtonGrid $cols={2}>
        <Button
          $large
          $variant="success"
          onClick={() => handleRespuesta(true)}
          disabled={feedback !== null}
        >
          ✓ Palabra Real
        </Button>
        <Button
          $large
          $variant="danger"
          onClick={() => handleRespuesta(false)}
          disabled={feedback !== null}
        >
          ✗ Palabra Inventada
        </Button>
      </ButtonGrid>

      {feedback && (
        <FeedbackBox $success={feedback.correcto}>
          {feedback.correcto ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {feedback.correcto ? 
            `¡Correcto! Tiempo: ${(feedback.tiempo / 1000).toFixed(2)}s` : 
            `No, esta palabra ${palabra.esReal ? 'SÍ existe' : 'NO existe'} en español`
          }
        </FeedbackBox>
      )}
    </Card>
  );
}