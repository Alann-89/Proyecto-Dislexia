import React, { useState } from 'react';
import { Home, Star, CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, WordCard, ButtonGrid, FeedbackBox 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E03SonidosLetras({ ejercicio, onVolver, onComplete }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);

  const pregunta = ejercicio.preguntas[preguntaActual];
  // Manejo seguro de opciones (si la IA manda más o menos)
  const opciones = pregunta.opciones || ['a', 'b', 'c'];

  // --- FUNCIÓN DE AUDIO ---
  const reproducirSonido = (texto) => {
    if ('speechSynthesis' in window) {
      // Limpiamos las barras / / para que la voz no las lea literalmente
      // Ej: "/m/" -> "m"
      const sonidoLimpio = texto.replace(/\//g, '');
      
      // Le decimos al navegador que diga "El sonido..." para dar contexto
      const frase = `El sonido ${sonidoLimpio}`;

      const utterance = new SpeechSynthesisUtterance(frase);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8; // Lento y claro
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRespuesta = (opcion) => {
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

      <QuestionCard $bgColor="#fef3c7" $borderColor="#f59e0b">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
          <Text style={{ fontSize: '1.125rem', margin: '0 0 12px 0' }}>
            Escucha atentamente:
          </Text>
          
          {/* BOTÓN DE REPRODUCCIÓN */}
          <Button 
            onClick={() => reproducirSonido(pregunta.sonido)}
            style={{ 
              background: '#f59e0b', 
              marginBottom: '20px',
              padding: '12px 24px',
              gap: '10px'
            }}
          >
            <Volume2 size={24} /> Escuchar Sonido
          </Button>
        </div>

        {/*<WordCard style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>
          {pregunta.sonido}
        </WordCard>*/}
        
        <Text style={{ fontSize: '1rem', color: '#92400e', marginTop: '16px' }}>
          ¿Qué letra representa este sonido?
        </Text>
      </QuestionCard>

      {/* Grid dinámico: 3 columnas es un buen estándar para letras */}
      <ButtonGrid $cols={3}>
        {opciones.map((opcion, idx) => (
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
          {feedback.correcto ? '¡Excelente!' : `No, la respuesta correcta es "${pregunta.correcta}"`}
        </FeedbackBox>
      )}
    </Card>
  );
}