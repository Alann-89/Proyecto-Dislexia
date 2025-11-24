import React, { useState, useEffect } from 'react';
import { FlexContainer, Text, TestCard, ButtonGrid, Button } from '../styles';
import { PALABRAS_REALES, PALABRAS_INVENTADAS } from '../constants';

export default function ModuloB({ resultados, setResultados, onComplete }) {
  const [palabras] = useState([...PALABRAS_REALES, ...PALABRAS_INVENTADAS].sort(() => Math.random() - 0.5).slice(0, 20));
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [tiempos, setTiempos] = useState([]);
  const [inicio, setInicio] = useState(Date.now());

  useEffect(() => {
    setInicio(Date.now());
  }, [indice]);

  const handleRespuesta = (esReal) => {
    const tiempo = Date.now() - inicio;
    const palabraActual = palabras[indice];
    const correcta = (esReal && PALABRAS_REALES.includes(palabraActual)) ||
      (!esReal && PALABRAS_INVENTADAS.includes(palabraActual));
    
    const nuevasRespuestas = [...respuestas, correcta];
    const nuevosTiempos = [...tiempos, tiempo];
    
    setRespuestas(nuevasRespuestas);
    setTiempos(nuevosTiempos);

    if (indice < palabras.length - 1) {
      setIndice(indice + 1);
    } else {
      const aciertos = nuevasRespuestas.filter(Boolean).length;
      const tiempoPromedio = nuevosTiempos.reduce((a, b) => a + b, 0) / nuevosTiempos.length;
      setResultados({
        ...resultados,
        modulo_b_nonwords_aciertos: aciertos,
        modulo_b_nonwords_total: palabras.length,
        modulo_b_nonwords_tiempo_ms: Math.round(tiempoPromedio)
      });
      onComplete(); // Notifica al layout que este módulo terminó
    }
  };

  return (
    <>
      <FlexContainer $justify="space-between" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Test de Palabras</h3>
        <Text $size="0.875rem" $mb="0">Palabra {indice + 1} de {palabras.length}</Text>
      </FlexContainer>
      <TestCard $bgColor="#faf5ff">
        <Text $mb="24px" $align="center">¿Esta palabra existe en español?</Text>
        <Text $size="3.75rem" $mb="32px" $align="center" $color="#7c3aed" style={{ fontWeight: 'bold', margin: '48px 0' }}>{palabras[indice]}</Text>
        <Text $size="0.875rem" $mb="0" $align="center" $color="#6b7280">Responde lo más rápido que puedas</Text>
      </TestCard>
      <ButtonGrid $cols="repeat(2, 1fr)">
        <Button onClick={() => handleRespuesta(true)} style={{ padding: '24px', fontSize: '1.25rem', background: '#10b981' }}>
          ✓ Palabra Real
        </Button>
        <Button onClick={() => handleRespuesta(false)} style={{ padding: '24px', fontSize: '1.25rem', background: '#ef4444' }}>
          ✗ Palabra Inventada
        </Button>
      </ButtonGrid>
    </>
  );
}