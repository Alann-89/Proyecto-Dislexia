import React, { useState } from 'react';
import {
  FlexContainer,
  Text,
  TestCard,
  ButtonGrid,
  WordButton
} from '../styles';
import { PALABRAS_ORTOGRAFIA } from '../constants';

export default function ModuloD({ resultados, setResultados, onComplete }) {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  const handleRespuesta = (esCorrecta) => {
    const nuevasRespuestas = [...respuestas, esCorrecta];
    setRespuestas(nuevasRespuestas);

    if (indice < PALABRAS_ORTOGRAFIA.length - 1) {
      setIndice(indice + 1);
    } else {
      // Módulo final. Actualiza el estado y llama a onComplete (que es 'enviarAnalisis')
      const aciertos = nuevasRespuestas.filter(Boolean).length;
      const resultadosFinales = {
        ...resultados,
        modulo_d_ortografia_aciertos: aciertos,
        modulo_d_ortografia_total: PALABRAS_ORTOGRAFIA.length
      };
      
      // Pasa los resultados finales al orquestador
      onComplete(resultadosFinales); 
    }
  };

  const palabra = PALABRAS_ORTOGRAFIA[indice];
  const opciones = [palabra.correcta, palabra.incorrecta].sort(() => Math.random() - 0.5);

  return (
    <>
      <FlexContainer $justify="space-between" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Test de Ortografía</h3>
        <Text $size="0.875rem" $mb="0">Palabra {indice + 1} de {PALABRAS_ORTOGRAFIA.length}</Text>
      </FlexContainer>
      <TestCard $bgColor="#fff7ed">
        <div style={{ fontSize: '5rem', marginBottom: '24px' }}>{palabra.imagen}</div>
        <Text $size="1.25rem" $mb="24px" $align="center">¿Cuál está bien escrita?</Text>
        <ButtonGrid $cols="repeat(2, 1fr)" $maxWidth="500px">
          {opciones.map((opcion, idx) => (
            <WordButton
              key={idx}
              $large
              onClick={() => handleRespuesta(opcion === palabra.correcta)}
              $color="#ea580c"
              $hoverBg="#fff7ed"
            >
              {opcion}
            </WordButton>
          ))}
        </ButtonGrid>
      </TestCard>
    </>
  );
}