import React from 'react';
import { Trophy, Star, ArrowLeft } from 'lucide-react';
import { Card, Title, ScoreDisplay, Text, Button } from '../styles';

export default function ResultadoFinal({ puntos, total, onVolver }) {
  const porcentaje = (puntos / total) * 100;
  const estrellas = porcentaje >= 90 ? 3 : porcentaje >= 70 ? 2 : 1;

  return (
    <Card>
      <div style={{ textAlign: 'center' }}>
        <Button $variant="secondary"  onClick={onVolver} $margin="32px 0 0 0">
          <ArrowLeft size={20} /> Volver al Menú
        </Button>

        <Trophy size={80} color="#fbbf24" style={{ margin: '0 auto 20px' }} />
        <Title>¡Ejercicio Completado!</Title>
        
        <ScoreDisplay style={{ fontSize: '2rem', marginTop: '32px' }}>
          <Star /> {puntos} / {total} puntos
        </ScoreDisplay>

        <div style={{ fontSize: '3rem', margin: '24px 0' }}>
          {Array.from({ length: estrellas }, (_, i) => '⭐').join('')}
        </div>

        <Text style={{ fontSize: '1.25rem', textAlign: 'center' }}>
          {porcentaje >= 90 ? '¡Excelente trabajo!' :
           porcentaje >= 70 ? '¡Muy bien! Sigue practicando' :
           '¡Buen esfuerzo! Practica más para mejorar'}
        </Text>
      </div>
    </Card>
  );
}