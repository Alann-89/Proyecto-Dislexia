import React from 'react';
import {
  Container,
  Card,
  Spinner,
  Title,
  Text,
  AlertBox
} from '../styles';

export default function AnalizandoStep() {
  return (
    <Container $maxWidth="900px">
      <Card>
        <div style={{ textAlign: 'center' }}>
          <Spinner />
          <Title style={{ marginTop: '24px' }}>Analizando tus resultados...</Title>
          <Text $align="center">
            Nuestro sistema está procesando tus respuestas para generar un perfil personalizado 
            y recomendaciones específicas para ti.
          </Text>
          <AlertBox $bgColor="#eff6ff" $borderColor="#0F3460">
            <Text $mb="0" $size="0.875rem">
              Esto puede tomar unos momentos. Por favor, no cierres esta ventana.
            </Text>
          </AlertBox>
        </div>
      </Card>
    </Container>
  );
}