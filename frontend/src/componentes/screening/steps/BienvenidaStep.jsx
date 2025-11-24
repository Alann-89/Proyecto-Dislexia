import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, AlertCircle, BookOpen, LogOut, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import {
  Container,
  Card,
  IconWrapper,
  Title,
  Text,
  AlertBox,
  Button,
  CerrarSesionButton,
  Header,
  UserInfo,
  SectionTitle,
  OptionsGrid,
  OptionCard,
  Badge,
  CardContent,
  NumberCircle,
  OptionTitle,
  OptionDescription
} from '../styles';

export default function BienvenidaStep({ onNext }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    const confirm = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirm) {
      logout();
    }
  };

  return (
    <Container $maxWidth="968px">
      <Card>
        {/* Header con info de usuario */}
        <Header>
          <UserInfo>
            <User size={20} color="#6DD5FA" />
              <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                Sesión iniciada como:
              </div>
              <div style={{ fontWeight: '600', color: '#1f2937' }}>
                {user?.nombre || 'Usuario'}
              </div>
          </UserInfo>

          <CerrarSesionButton onClick={handleLogout}>
            <LogOut size={16} /> Cerrar Sesión
          </CerrarSesionButton>
        </Header>

        {/* Contenido principal */}
        <IconWrapper $size="72px" $color="#6DD5FA" $margin="0 auto 24px">
          <Brain />
        </IconWrapper>

        <Title style={{ marginBottom: '12px' }}>
          ¡Bienvenido a NeuroLectura!
        </Title>
        
        <Text $align="center" $mb="32px" style={{ fontSize: '1.125rem' }}>
          Esta es una herramienta de apoyo y screening, <strong>no es un diagnóstico médico</strong>. 
          Los resultados son orientativos y están diseñados para ayudarte a identificar áreas de mejora.
        </Text>

        {/* Sección: ¿Qué puedes hacer? */}
        <div style={{ marginBottom: '32px' }}>
          <SectionTitle>¿Qué te gustaría hacer hoy?</SectionTitle>

          <OptionsGrid>
            {/* Opción 1: Evaluación - DESTACADA */}
            <OptionCard $primary>
              <Badge>Recomendado</Badge>
              
              <CardContent>
                <NumberCircle $primary>1</NumberCircle>
                <div>
                  <OptionTitle $primary>Realizar Evaluación</OptionTitle>
                  <OptionDescription $primary>
                    Descubre tu perfil. Completa una serie de ejercicios para identificar tus fortalezas.
                  </OptionDescription>
                </div>
              </CardContent>

              <Button 
                onClick={onNext} 
                style={{ 
                  background: 'white', 
                  color: '#2980B9', 
                  width: '100%' 
                }}
              >
                Comenzar Evaluación
              </Button>
            </OptionCard>

            {/* Opción 2: Ejercicios */}
            <OptionCard>
              <CardContent>
                <NumberCircle>2</NumberCircle>
                <div>
                  <OptionTitle>Practicar Ejercicios</OptionTitle>
                  <OptionDescription>
                    Si ya conoces tu perfil, accede directamente al centro de práctica para mejorar tus habilidades.
                  </OptionDescription>
                </div>
              </CardContent>

              <Button 
                $variant="secondary" 
                onClick={() => navigate('/ejercicios')}
                style={{ width: '100%' }}
              >
                <BookOpen size={18} /> Ir a Ejercicios
              </Button>
            </OptionCard>
          </OptionsGrid>
        </div>

        {/* Nota importante */}
        <AlertBox $bgColor="#fef3c7" $borderColor="#f59e0b">
          <AlertCircle color="#d97706" size={20} />
          <div>
            <Text $mb="0" $size="0.875rem" $color="#78350f">
              Esta herramienta proporciona orientación educativa, no es un diagnóstico médico. 
              Si tienes preocupaciones sobre dificultades de aprendizaje, consulta con un profesional especializado.
            </Text>
          </div>
        </AlertBox>

      </Card>
    </Container>
  );
}