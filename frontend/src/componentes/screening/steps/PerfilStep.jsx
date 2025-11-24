import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  Container,
  Card,
  Subtitle,
  Text,
  Input,
  Select,
  Button
} from '../styles';

// NOTA: Añadí la corrección de accesibilidad (htmlFor/id) que te había sugerido.
export default function PerfilStep({ perfil, setPerfil, onNext, onBack }) {
  return (
    <Container $maxWidth="900px">
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '24px' }}>
          <Button 
            $variant="secondary" 
            onClick={onBack}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Volver
          </Button>
        </div>

        <Subtitle $align="center">Personaliza tu Evaluación</Subtitle>
        <Text $align="center">
          Estos datos nos ayudarán a adaptar las pruebas y proporcionar recomendaciones más precisas.
        </Text>
        
        <div style={{ marginTop: '32px' }}>
          <label htmlFor="edadInput" style={{ display: 'block', fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Edad</label>
          <Input
            id="edadInput"
            type="number"
            min="7"
            max="99"
            value={perfil.edad}
            onChange={(e) => setPerfil({ ...perfil, edad: e.target.value })}
            placeholder="Ingresa tu edad"
          />
          
          <label htmlFor="escolaridadSelect" style={{ display: 'block', fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Nivel de Escolaridad</label>
          <Select
            id="escolaridadSelect"
            value={perfil.escolaridad}
            onChange={(e) => setPerfil({ ...perfil, escolaridad: e.target.value })}
          >
            <option value="">Selecciona...</option>
            <option value="2do Primaria">2do Primaria</option>
            <option value="3ro Primaria">3ro Primaria</option>
            <option value="4to Primaria">4to Primaria</option>
            <option value="5to Primaria">5to Primaria</option>
            <option value="6to Primaria">6to Primaria</option>
            <option value="1ro Secundaria">1ro Secundaria</option>
            <option value="2do Secundaria">2do Secundaria</option>
            <option value="3ro Secundaria">3ro Secundaria</option>
            <option value="Bachillerato">Bachillerato</option>
            <option value="Universidad">Universidad</option>
            <option value="Posgrado">Posgrado</option>
          </Select>

          <Button
            $fullWidth
            onClick={onNext}
            disabled={!perfil.edad || !perfil.escolaridad}
          >
            Continuar a las Pruebas
          </Button>
        </div>
      </Card>
    </Container>
  );
}