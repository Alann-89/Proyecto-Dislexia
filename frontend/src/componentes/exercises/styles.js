import styled, { keyframes } from 'styled-components';

// Animaciones
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled Components
export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%);
  padding: 20px;
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-in;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800; /* Más bold como en el inicio */
  text-align: center;
  color: #1f2937;
  margin-bottom: 12px;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
`;

export const Text = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const Button = styled.button`
  background: ${props => props.$variant === 'success' ? '#10b981' : 
                props.$variant === 'danger' ? '#ef4444' :
                props.$variant === 'secondary' ? '#0F3460' : '#2980B9'};
  color: white;
  border: none;
  padding: ${props => props.$large ? '20px 40px' : '12px 32px'};
  border-radius: 12px;
  font-size: ${props => props.$large ? '1.5rem' : '1.125rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin: ${props => props.$margin || '0'};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin: 32px 0;
`;

export const ExerciseCard = styled.div`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 20px; /* Bordes más redondeados como el inicio */
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #2563eb;
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

export const CategoryBadge = styled.span`
  background: ${props => props.$color || '#eff6ff'};
  color: ${props => props.$textColor || '#2563eb'};
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 16px;
  align-self: flex-start;
`;
export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #6DD5FA 0%, #2980B9 100%);
  width: ${props => props.$progress}%;
  transition: width 0.5s ease;
`;

export const ScoreDisplay = styled.div`
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const QuestionCard = styled.div`
  background: ${props => props.$bgColor || '#f0f9ff'};
  padding: 32px;
  border-radius: 16px;
  margin: 24px 0;
  text-align: center;
  border: 3px solid ${props => props.$borderColor || '#60a5fa'};
`;

export const OptionButton = styled.button`
  background: white;
  border: 3px solid #d1d5db;
  padding: 20px;
  border-radius: 12px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;
  margin: 8px 0;
  font-weight: 500;

  &:hover:not(:disabled) {
    border-color: #60a5fa;
    background: #eff6ff;
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FeedbackBox = styled.div`
  background: ${props => props.$success ? '#d1fae5' : '#fee2e2'};
  border: 2px solid ${props => props.$success ? '#10b981' : '#ef4444'};
  color: ${props => props.$success ? '#065f46' : '#991b1b'};
  padding: 16px;
  border-radius: 12px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  animation: ${fadeIn} 0.3s ease-in;
`;

export const WordCard = styled.div`
  background: white;
  border: 3px solid #2980B9;
  padding: 24px 40px;
  border-radius: 16px;
  font-size: 3rem;
  font-weight: bold;
  color: #2980B9;
  margin: 32px auto;
  text-align: center;
  max-width: 400px;
  animation: ${bounce} 2s infinite;
`;

export const TimerDisplay = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #6DD5FA;
  text-align: center;
  font-family: 'Courier New', monospace;
  margin: 20px 0;
`;

export const InputText = styled.input`
  width: 100%;
  padding: 16px;
  border: 3px solid #d1d5db;
  border-radius: 12px;
  font-size: 1.25rem;
  text-align: center;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #6DD5FA;
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols || 2}, 1fr);
  gap: 16px;
  margin: 24px 0;
`;

export const AlertCard = styled.div`
  background: #f0f9ff; /* Azul muy claro */
  border: 2px solid #60a5fa; /* Azul medio */
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 40px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  /* Decoración sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(to bottom, #60a5fa, #3b82f6);
  }
`;

export const AlertContent = styled.div`
  flex: 1;
`;

export const AlertTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937; /* Azul oscuro */
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AlertText = styled.p`
  color: #374151; /* Gris oscuro */
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`;
export const SecondaryButton = styled.button`
  background: white;
  color: #4b5563;
  border: 2px solid #e5e7eb;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 12px;

  &:hover {
    border-color: #2980B9;
    color: #2980B9;
    background: #f9fafb;
  }
`;

export const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 24px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(
      to ${props => props.$direction || 'right'},
      transparent,
      #e5e7eb
    );
  }

  &::after {
    background: linear-gradient(to left, transparent, #e5e7eb);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
  margin: 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoBox = styled.div`
  background: #eff6ff;
  border-left: 4px solid #2980B9; /* Azul vibrante */
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const InfoText = styled.p`
  color: #1e40af;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

export const LockedExerciseCard = styled.div`
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 20px;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0.8;
  transition: all 0.3s ease;
  cursor: not-allowed;

  /* Icono de candado grande de fondo */
  &::after {
    content: '🔒';
    font-size: 4rem;
    position: absolute;
    opacity: 0.1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const LockedTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #6b7280;
  margin-bottom: 8px;
`;

export const LockedText = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
  margin-bottom: 16px;
`;