import React, { useState } from 'react';
import { Headphones, Volume2 } from 'lucide-react'; // <--- Importamos Volume2
import {
  FlexContainer,
  Text,
  TestCard,
  IconWrapper,
  ButtonGrid,
  WordButton,
  Button // <--- Asegúrate de importar Button
} from '../styles';
import { SONIDOS_FONOLOGICOS, PALABRAS_SILABAS } from '../constants';

export default function ModuloA({ resultados, setResultados, onComplete }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [etapa, setEtapa] = useState('sonidos');
  const [respuestasSilabas, setRespuestasSilabas] = useState([]);

  // --- NUEVA FUNCIÓN DE TEXT-TO-SPEECH ---
  const reproducirSonido = (texto, esFonema = false) => {
    if ('speechSynthesis' in window) {
      // Si es fonema (ej: /b/), limpiamos las barras y decimos "El sonido..." para que sea más claro
      const textoLimpio = texto.replace(/\//g, '');
      const frase = esFonema ? `${textoLimpio}` : texto;

      const utterance = new SpeechSynthesisUtterance(frase);
      utterance.lang = 'es-ES'; // Español
      utterance.rate = 0.8; // Un poco más lento para que se entienda bien
      
      // Cancelamos cualquier audio anterior para evitar colas
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tu navegador no soporta la reproducción de audio.");
    }
  };

  const handleRespuestaSonido = (index) => {
    const correcta = SONIDOS_FONOLOGICOS[preguntaActual].correcta === index;
    setRespuestas([...respuestas, correcta]);

    if (preguntaActual < SONIDOS_FONOLOGICOS.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setEtapa('silabas');
      setPreguntaActual(0);
    }
  };

  const handleRespuestaSilaba = (numSilabas) => {
    const correcta = PALABRAS_SILABAS[preguntaActual].silabas === numSilabas;
    const nuevasRespuestas = [...respuestasSilabas, correcta];
    setRespuestasSilabas(nuevasRespuestas);

    if (preguntaActual < PALABRAS_SILABAS.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      const aciertos = respuestas.filter(Boolean).length + nuevasRespuestas.filter(Boolean).length;
      setResultados({
        ...resultados,
        modulo_a_aciertos: aciertos,
        modulo_a_total: SONIDOS_FONOLOGICOS.length + PALABRAS_SILABAS.length
      });
      onComplete();
    }
  };

  if (etapa === 'sonidos') {
    const pregunta = SONIDOS_FONOLOGICOS[preguntaActual];
    return (
      <>
        <FlexContainer $justify="space-between" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Conciencia Fonológica</h3>
          <Text $size="0.875rem" $mb="0">Pregunta {preguntaActual + 1} de {SONIDOS_FONOLOGICOS.length}</Text>
        </FlexContainer>
        
        <TestCard $bgColor="#eff6ff">
          <IconWrapper $size="64px" $color="#2563eb" $margin="0 auto 16px">
            <Headphones />
          </IconWrapper>
          
          <Text $size="1.5rem" $mb="8px" $align="center" style={{ fontWeight: 'bold' }}>
            Escucha el sonido:
          </Text>

          {/* --- BOTÓN DE AUDIO --- */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <Button 
              onClick={() => reproducirSonido(pregunta.sonido, true)}
              $variant="secondary"
              style={{ gap: '10px', padding: '15px 30px' }}
            >
              <Volume2 size={24} /> Reproducir Sonido
            </Button>
          </div>
          
          <Text $mb="24px" $align="center">¿Qué letra representa este sonido?</Text>
        </TestCard>

        <ButtonGrid $cols="repeat(3, 1fr)">
          {pregunta.opciones.map((opcion, idx) => (
            <WordButton
              key={idx}
              $large
              onClick={() => handleRespuestaSonido(idx)}
              $color="#2563eb"
              $hoverBg="#eff6ff"
            >
              {opcion}
            </WordButton>
          ))}
        </ButtonGrid>
      </>
    );
  } else {
    const pregunta = PALABRAS_SILABAS[preguntaActual];
    return (
      <>
        <FlexContainer $justify="space-between" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Conteo de Sílabas</h3>
          <Text $size="0.875rem" $mb="0">Pregunta {preguntaActual + 1} de {PALABRAS_SILABAS.length}</Text>
        </FlexContainer>
        
        <TestCard $bgColor="#f0fdf4">
          <Text $size="1.25rem" $mb="16px" $align="center">¿Cuántas sílabas tiene la palabra?</Text>
          
          {/* --- BOTÓN DE AUDIO PARA PALABRA --- */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
             <Button 
              onClick={() => reproducirSonido(pregunta.palabra)}
              $variant="secondary"
              style={{ gap: '10px', backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #86efac' }}
            >
              <Volume2 size={24} /> Escuchar Palabra
            </Button>
          </div>

          <Text $size="3rem" $mb="24px" $align="center" $color="#16a34a" style={{ fontWeight: 'bold', margin: '24px 0' }}>
            {pregunta.palabra}
          </Text>
        </TestCard>
        
        <ButtonGrid $cols="repeat(4, 1fr)" $maxWidth="600px">
          {[1, 2, 3, 4].map((num) => (
            <WordButton
              key={num}
              $large
              onClick={() => handleRespuestaSilaba(num)}
              $color="#16a34a"
              $hoverBg="#f0fdf4"
            >
              {num}
            </WordButton>
          ))}
        </ButtonGrid>
      </>
    );
  }
}