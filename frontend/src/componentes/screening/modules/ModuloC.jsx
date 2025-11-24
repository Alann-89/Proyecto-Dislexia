import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Play, StopCircle } from 'lucide-react';
import {
  FlexContainer,
  Text,
  TestCard,
  IconWrapper,
  Button,
  ReadingBox,
  WordButton
} from '../styles';
import { TEXTO_LECTURA } from '../constants';

export default function ModuloC({ getNivelLectura, resultados, setResultados, onComplete }) {
  const [etapa, setEtapa] = useState('instrucciones');
  const [tiempoLectura, setTiempoLectura] = useState(0);
  const [inicio, setInicio] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [segundos, setSegundos] = useState(0);

  const nivel = getNivelLectura();
  const datos = TEXTO_LECTURA[nivel];

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
    setInicio(Date.now());
    setSegundos(0);
  };

  const terminarLectura = () => {
    const tiempo = (Date.now() - inicio) / 1000;
    setTiempoLectura(tiempo);
    setEtapa('preguntas');
  };

  const handleRespuesta = (indiceRespuesta) => {
    const correcta = datos.preguntas[preguntaActual].correcta === indiceRespuesta;
    const nuevasRespuestas = [...respuestas, correcta];
    setRespuestas(nuevasRespuestas);

    if (preguntaActual < datos.preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      const aciertos = nuevasRespuestas.filter(Boolean).length;
      setResultados({
        ...resultados,
        modulo_c_fluidez_tiempo_s: Math.round(tiempoLectura),
        modulo_c_fluidez_palabras_texto: datos.palabras,
        modulo_c_comprension_aciertos: aciertos,
        modulo_c_comprension_total: datos.preguntas.length
      });
      onComplete(); // Notifica al layout que este módulo terminó
    }
  };

  if (etapa === 'instrucciones') {
    return (
      <>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>Test de Fluidez Lectora</h3>
        <TestCard $bgColor="#eff6ff">
          <IconWrapper $size="48px" $color="#2980B9" $margin="0 0 16px 0" $justify="flex-start"> 
            <BookOpen />
          </IconWrapper>
          <h4 style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '16px' }}>Instrucciones:</h4>
          <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '24px', lineHeight: '2', color: '#4b5563' }}>
            <li>Lee el texto que aparecerá en la siguiente pantalla</li>
            <li>Lee en silencio, pero asegúrate de comprender lo que lees</li>
            <li>Presiona "Empezar" para iniciar el cronómetro</li>
            <li>Cuando termines, presiona "Terminé"</li>
            <li>Responderás algunas preguntas sobre el texto</li>
          </ul>
        </TestCard>
        <Button $fullWidth onClick={iniciarLectura} style={{ marginTop: '24px' }}>
          <Play /> Empezar Lectura
        </Button>
      </>
    );
  }

  if (etapa === 'leyendo') {
    return (
      <>
        <FlexContainer $justify="space-between" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Leyendo...</h3>
          <FlexContainer $gap="8px" style={{ color: '#2980B9', fontWeight: '600' }}>
            <Clock />
            <span style={{ fontFamily: 'monospace' }}>
              {Math.floor(segundos / 60)}:{(segundos % 60).toString().padStart(2, '0')}
            </span>
          </FlexContainer>
        </FlexContainer>
        <ReadingBox $fontSize={nivel === 'adulto' ? '1rem' : '1.125rem'}>
          {datos.texto}
        </ReadingBox>
        <Button $fullWidth onClick={terminarLectura} style={{ marginTop: '24px', background: '#16a34a' }}>
          <StopCircle /> Terminé de Leer
        </Button>
      </>
    );
  }

  const pregunta = datos.preguntas[preguntaActual];
  return (
    <>
      <FlexContainer $justify="space-between" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Comprensión Lectora</h3>
        <Text $size="0.875rem" $mb="0">Pregunta {preguntaActual + 1} de {datos.preguntas.length}</Text>
      </FlexContainer>
      <TestCard $bgColor="#f0fdf4">
        <Text $size="1.125rem" $mb="24px" $align="center" style={{ fontWeight: '600' }}>{pregunta.pregunta}</Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {pregunta.opciones.map((opcion, idx) => (
            <WordButton
              key={idx}
              onClick={() => handleRespuesta(idx)}
              $color="#16a34a"
              $hoverBg="#f0fdf4"
              style={{ width: '100%', textAlign: 'left', fontSize: '1rem', padding: '16px 24px' }}
            >
              {opcion}
            </WordButton>
          ))}
        </div>
      </TestCard>
    </>
  );
}