import React, { useState, useEffect } from 'react';
import { Home, Star, CheckCircle, XCircle } from 'lucide-react';
import { 
  Card, Button, Subtitle, ProgressBar, ProgressFill, ScoreDisplay, 
  QuestionCard, Text, FeedbackBox 
} from '../styles';
import ResultadoFinal from '../shared/ResultadoFinal';

export default function E09ConstruccionOraciones({ ejercicio, onVolver, onComplete }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [palabrasOrdenadas, setPalabrasOrdenadas] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [palabrasDisponibles, setPalabrasDisponibles] = useState([]);

  useEffect(() => {
    const ejercicioActual = ejercicio.ejercicios[preguntaActual];
    // Creamos objetos con ID únicos para evitar problemas al arrastrar palabras repetidas
    setPalabrasDisponibles([...ejercicioActual.palabras]
      .sort(() => Math.random() - 0.5)
      .map((p, i) => ({ id: `disp-${i}`, text: p }))
    );
    setPalabrasOrdenadas([]);
  }, [preguntaActual]);

  // --- LÓGICA DE MOVIMIENTO (CLIC Y ARRASTRAR) ---

  const moverAOrdenadas = (item, index) => {
    setPalabrasOrdenadas([...palabrasOrdenadas, item]);
    setPalabrasDisponibles(palabrasDisponibles.filter((_, i) => i !== index));
  };

  const moverADisponibles = (item, index) => {
    setPalabrasOrdenadas(palabrasOrdenadas.filter((_, i) => i !== index));
    setPalabrasDisponibles([...palabrasDisponibles, item]);
  };

  // --- HANDLERS DE DRAG & DROP NATIVO ---

  const handleDragStart = (e, index, origen) => {
    // Guardamos el índice y el origen en el evento
    e.dataTransfer.setData('application/json', JSON.stringify({ index, origen }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el "Drop"
  };

  const handleDrop = (e, destino) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    const { index, origen } = JSON.parse(data);

    // Solo mover si cambiamos de zona
    if (origen === 'disponibles' && destino === 'construccion') {
      moverAOrdenadas(palabrasDisponibles[index], index);
    } else if (origen === 'construccion' && destino === 'disponibles') {
      moverADisponibles(palabrasOrdenadas[index], index);
    }
  };

  // --- VERIFICACIÓN ---

  const verificarOracion = () => {
    const ejercicioActual = ejercicio.ejercicios[preguntaActual];
    // Extraemos solo el texto de nuestros objetos
    const oracionFormada = palabrasOrdenadas.map(p => p.text).join(' ');
    const esCorrecta = oracionFormada === ejercicioActual.correcta;

    setFeedback({ correcto: esCorrecta });
    
    if (esCorrecta) {
      setPuntos(puntos + 15);
    }

    setTimeout(() => {
      if (preguntaActual < ejercicio.ejercicios.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setFeedback(null);
      } else {
        setFinalizado(true);
      }
    }, 2000);
  };

  if (finalizado) {
    return <ResultadoFinal puntos={puntos} total={ejercicio.ejercicios.length * 15} onVolver={onComplete || onVolver} />;
  }

  return (
    <Card>
      <Button $variant="secondary" onClick={onVolver} $margin="0 0 20px 0">
        <Home size={20} /> Volver al Menú
      </Button>

      <Subtitle>{ejercicio.titulo}</Subtitle>
      <ProgressBar>
        <ProgressFill $progress={((preguntaActual + 1) / ejercicio.ejercicios.length) * 100} />
      </ProgressBar>

      <ScoreDisplay>
        <Star /> {puntos} puntos
      </ScoreDisplay>

      <QuestionCard $bgColor="#fae8ff" $borderColor="#7c3aed">
        <Text style={{ fontSize: '1.125rem', marginBottom: '16px' }}>
          Arrastra o haz clic en las palabras para formar la oración correcta:
        </Text>
      </QuestionCard>

      {/* Zona de construcción (DROP TARGET) */}
      <div 
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'construccion')}
        style={{
          background: '#f3f4f6',
          minHeight: '100px',
          borderRadius: '12px',
          border: '3px dashed #9ca3af',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          transition: 'all 0.2s'
        }}
      >
        {palabrasOrdenadas.length === 0 ? (
          <Text style={{ color: '#9ca3af', margin: '0 auto', pointerEvents: 'none' }}>
            Suelta las palabras aquí...
          </Text>
        ) : (
          palabrasOrdenadas.map((palabraObj, idx) => (
            <div
              key={palabraObj.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx, 'construccion')}
              onClick={() => moverADisponibles(palabraObj, idx)}
            >
              <Button style={{ background: '#7c3aed', margin: 0, cursor: 'grab' }}>
                {palabraObj.text}
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Palabras disponibles (DROP TARGET para devolverlas) */}
      <div 
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'disponibles')}
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '12px', 
          justifyContent: 'center', 
          marginBottom: '24px',
          minHeight: '60px' // Altura mínima para poder soltar si está vacío
        }}
      >
        {palabrasDisponibles.map((palabraObj, idx) => (
          <div
            key={palabraObj.id}
            draggable
            onDragStart={(e) => handleDragStart(e, idx, 'disponibles')}
            onClick={() => moverAOrdenadas(palabraObj, idx)}
          >
            <Button $variant="secondary" style={{ margin: 0, cursor: 'grab' }}>
              {palabraObj.text}
            </Button>
          </div>
        ))}
      </div>

      <Button
        $fullWidth
        $large
        $variant="success"
        onClick={verificarOracion}
        disabled={palabrasOrdenadas.length === 0 || feedback !== null}
      >
        <CheckCircle /> Verificar Oración
      </Button>

      {feedback && (
        <FeedbackBox $success={feedback.correcto}>
          {feedback.correcto ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {feedback.correcto ? 
            '¡Excelente! Oración correcta' : 
            `La oración correcta es: "${ejercicio.ejercicios[preguntaActual].correcta}"`
          }
        </FeedbackBox>
      )}
    </Card>
  );
}