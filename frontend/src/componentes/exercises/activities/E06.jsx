import React, { useState, useEffect } from 'react';
import { Home, Trophy, Clock, BookOpen, Zap, CheckCircle } from 'lucide-react';
import { 
  Card, Button, Subtitle, ScoreDisplay, Text, QuestionCard, TimerDisplay 
} from '../styles';

export default function E06LecturaCronometrada({ ejercicio, onVolver, onComplete }) {
  const [etapa, setEtapa] = useState('instrucciones'); // instrucciones, leyendo, preguntas
  const [segundos, setSegundos] = useState(0);
  const [tiempoLectura, setTiempoLectura] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    let interval;
    if (etapa === 'leyendo') {
      interval = setInterval(() => {
        setSegundos(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [etapa]);

  const iniciarLectura = () => {
    setEtapa('leyendo');
    setSegundos(0);
  };

  const terminarLectura = () => {
    setTiempoLectura(segundos);
    setEtapa('preguntas');
  };

  const handleRespuesta = (opcion) => {
    const pregunta = ejercicio.preguntas[preguntaActual];
    const esCorrecta = opcion === pregunta.correcta;

    setFeedback({ correcto: esCorrecta });
    
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
    const handleFinish = () => {
      if (onComplete) {
        onComplete(); // Bloquea el ejercicio
      } else {
        onVolver(); // Solo vuelve (fallback)
      }
    };

    return (
      <Card>
        <Subtitle style={{ textAlign: 'center' }}>¡Ejercicio Completado!</Subtitle>
        <ScoreDisplay>
          <Trophy /> {puntos} / {ejercicio.preguntas.length * 10} puntos
        </ScoreDisplay>
        <div style={{ background: '#f0f9ff', padding: '24px', borderRadius: '12px', margin: '20px 0', textAlign: 'center' }}>
          <Text style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
            ⏱ Tiempo de lectura: {Math.floor(tiempoLectura / 60)}:{(tiempoLectura % 60).toString().padStart(2, '0')}
          </Text>
          <Text style={{ color: '#6b7280' }}>
            {tiempoLectura < 30 ? '¡Excelente velocidad!' : 
             tiempoLectura < 60 ? '¡Muy bien!' : 
             '¡Sigue practicando!'}
          </Text>
        </div>
        <Button $fullWidth onClick={handleFinish}>
          <Home size={20} /> Volver al Menú
        </Button>
      </Card>
    );
  }

  if (etapa === 'instrucciones') {
    return (
      <Card>
        <Button $variant="secondary" onClick={onVolver} $margin="0 0 20px 0">
          <Home size={20} /> Volver al Menú
        </Button>

        <Subtitle>{ejercicio.titulo}</Subtitle>
        <QuestionCard>
          <BookOpen size={48} color="#60a5fa" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Instrucciones:</h3>
          <ul style={{ textAlign: 'left', lineHeight: '2', paddingLeft: '24px' }}>
            <li>Lee el texto lo más rápido que puedas</li>
            <li>Pero asegúrate de entender lo que lees</li>
            <li>Al terminar, responderás preguntas</li>
            <li>¡Presiona "Comenzar" cuando estés listo!</li>
          </ul>
        </QuestionCard>
        <Button $fullWidth $large onClick={iniciarLectura}>
          <Zap /> Comenzar Lectura
        </Button>
      </Card>
    );
  }

  if (etapa === 'leyendo') {
    return (
      <Card>
        <Subtitle>{ejercicio.titulo}</Subtitle>
        <TimerDisplay>
          <Clock size={32} style={{ display: 'inline', marginRight: '8px' }} />
          {Math.floor(segundos / 60)}:{(segundos % 60).toString().padStart(2, '0')}
        </TimerDisplay>

        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '12px',
          border: '3px solid #2980B9',
          lineHeight: '1.8',
          fontSize: '1.25rem',
          margin: '24px 0'
        }}>
          {ejercicio.texto}
        </div>

        <Button $fullWidth $large $variant="success" onClick={terminarLectura}>
          <CheckCircle /> Terminé de Leer
        </Button>
      </Card>
    );
  }

  const pregunta = ejercicio.preguntas[preguntaActual];

  // Reutilizamos estilos simples para las preguntas
  return (
    <Card>
      <Subtitle>{ejercicio.titulo} - Comprensión</Subtitle>
      <ScoreDisplay>
        <Trophy /> {puntos} puntos
      </ScoreDisplay>

      <QuestionCard >
        <Text style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          {pregunta.pregunta}
        </Text>
      </QuestionCard>

      <div style={{ display: 'grid', gap: '12px' }}>
        {pregunta.opciones.map((opcion, idx) => (
          <Button
            key={idx}
            $large
            onClick={() => handleRespuesta(opcion)}
            disabled={feedback !== null}
            style={{ justifyContent: 'flex-start', paddingLeft: '24px' }}
          >
            {opcion}
          </Button>
        ))}
      </div>
    </Card>
  );
}