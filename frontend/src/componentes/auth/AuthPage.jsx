import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Brain, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../../services/api'; // Importa la API real
import * as S from './styles'; // Importamos todos los estilos
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const [view, setView] = useState('login'); // 'login' o 'register'

  return (
    <S.AppContainer>
      <S.AuthContainer>
        {view === 'login' ? (
          <Login setView={setView} />
        ) : (
          <Register setView={setView} />
        )}
      </S.AuthContainer>
    </S.AppContainer>
  );
}

// --- LOGIN COMPONENT ---
function Login({ setView }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors({ 
        email: !formData.email ? 'Requerido' : '', 
        password: !formData.password ? 'Requerido' : '' 
      });
      return;
    }

    setLoading(true);
    try {
      await login(formData);
      navigate('/'); // Ir al inicio
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <S.LeftPanel>
        <S.FloatingIcon><Brain size={80} /></S.FloatingIcon>
        <S.LeftTitle>Bienvenido a NeuroLectura</S.LeftTitle>
        <S.LeftText>Mejora tus habilidades de lectura con ejercicios personalizados.</S.LeftText>
        <S.FeatureList>
          <S.FeatureItem><CheckCircle size={20} /><span>Evaluaciones con IA</span></S.FeatureItem>
          <S.FeatureItem><CheckCircle size={20} /><span>Ejercicios adaptativos</span></S.FeatureItem>
          <S.FeatureItem><CheckCircle size={20} /><span>Seguimiento de progreso</span></S.FeatureItem>
        </S.FeatureList>
      </S.LeftPanel>

      <S.RightPanel>
        <S.Logo>
          <Brain size={32} color="#6DD5FA" />
          <S.LogoText>NeuroLectura</S.LogoText>
        </S.Logo>

        <S.Title>Iniciar Sesión</S.Title>
        <S.Subtitle>Bienvenido de nuevo</S.Subtitle>

        {serverError && (
          <S.ErrorMessage style={{marginBottom: '16px', justifyContent: 'center'}}>
            <AlertCircle size={16} /> {serverError}
          </S.ErrorMessage>
        )}

        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label>Correo Electrónico</S.Label>
            <S.InputWrapper>
              <S.InputIcon><Mail size={20} /></S.InputIcon>
              <S.Input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                $error={errors.email}
              />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Contraseña</S.Label>
            <S.InputWrapper>
              <S.InputIcon><Lock size={20} /></S.InputIcon>
              <S.Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                $error={errors.password}
              />
              <S.PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </S.PasswordToggle>
            </S.InputWrapper>
          </S.InputGroup>

          <S.Button type="submit" disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar Sesión'} <ArrowRight size={20} />
          </S.Button>
        </S.Form>

        <S.TextCenter>
          ¿No tienes una cuenta? <S.Link onClick={() => setView('register')}>Regístrate</S.Link>
        </S.TextCenter>
      </S.RightPanel>
    </>
  );
}

// --- REGISTER COMPONENT ---
function Register({ setView }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setServerError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      // LLAMADA REAL AL BACKEND
     await register({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password
      });
      
      // 2. REDIRECCIÓN AL INICIO
      navigate('/');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <S.LeftPanel>
        <S.FloatingIcon><Brain size={80} /></S.FloatingIcon>
        <S.LeftTitle>Únete a NeuroLectura</S.LeftTitle>
        <S.LeftText>Comienza tu viaje hacia una mejor comprensión lectora.</S.LeftText>
        <S.FeatureList>
          <S.FeatureItem><CheckCircle size={20} /><span>Cuenta gratuita</span></S.FeatureItem>
          <S.FeatureItem><CheckCircle size={20} /><span>Acceso a todo</span></S.FeatureItem>
        </S.FeatureList>
      </S.LeftPanel>

      <S.RightPanel>
        <S.Title>Crear Cuenta</S.Title>
        <S.Subtitle>Completa tus datos</S.Subtitle>

        {serverError && (
          <S.ErrorMessage style={{marginBottom: '16px', justifyContent: 'center'}}>
            <AlertCircle size={16} /> {serverError}
          </S.ErrorMessage>
        )}

        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label>Nombre Completo</S.Label>
            <S.InputWrapper>
              <S.InputIcon><User size={20} /></S.InputIcon>
              <S.Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Juan Pérez" />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Correo Electrónico</S.Label>
            <S.InputWrapper>
              <S.InputIcon><Mail size={20} /></S.InputIcon>
              <S.Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Contraseña</S.Label>
            <S.InputWrapper>
              <S.InputIcon><Lock size={20} /></S.InputIcon>
              <S.Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" />
            </S.InputWrapper>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Confirmar Contraseña</S.Label>
            <S.InputWrapper>
              <S.InputIcon><Lock size={20} /></S.InputIcon>
              <S.Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Repite tu contraseña" />
            </S.InputWrapper>
          </S.InputGroup>

          <S.Button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Registrarse'} <ArrowRight size={20} />
          </S.Button>
        </S.Form>

        <S.TextCenter>
          ¿Ya tienes cuenta? <S.Link onClick={() => setView('login')}>Inicia Sesión</S.Link>
        </S.TextCenter>
      </S.RightPanel>
    </>
  );
}