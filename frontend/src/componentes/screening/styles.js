import styled, { keyframes } from 'styled-components';

// Animaciones
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%);
  padding: 32px 16px;
`;

export const Container = styled.div`
  max-width: ${props => props.$maxWidth || '1024px'};
  margin: 0 auto;
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: ${props => props.$padding || '32px'};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-in;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  color: ${props => props.$color || '#1f2937'};
`;

export const Subtitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: ${props => props.$align || 'left'};
  color: #1f2937;
`;

export const Text = styled.p`
  font-size: ${props => props.$size || '1.125rem'};
  line-height: 1.6;
  color: ${props => props.$color || '#4b5563'};
  margin-bottom: ${props => props.$mb || '24px'};
  text-align: ${props => props.$align || 'left'};
`;

export const Button = styled.button`
  background: ${props => props.$variant === 'secondary' ? '#e5e7eb' : 'linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%)'};
  color: ${props => props.$variant === 'secondary' ? '#374151' : 'white'};
  border: none;
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    background: ${props => props.$variant === 'secondary' ? '#d1d5db' : 'linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%)'};
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CerrarSesionButton = styled.button`
  background: none;         
  border: none;              
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;    
  gap: 6px;
  font-size: 0.9rem;        
  font-weight: 600;
  padding: 8px;
  border-radius: 8px;      
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #fef2f2;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  margin-bottom: 24px;
  transition: border-color 0.3s;

  box-sizing: border-box;
  line-height: 1;

  &:focus {
    outline: none;
    border-color: #2980B9;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  margin-bottom: 24px;
  background: white;
  cursor: pointer;

  box-sizing: border-box;
  line-height: 1;

  &:focus {
    outline: none;
    border-color: #2980B9;
  }
`;

export const ProgressContainer = styled.div`
  margin-bottom: 32px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProgressLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #6DD5FA 0%, #2980B9 100%));
  width: ${props => props.$progress}%;
  transition: width 0.5s ease;
`;

export const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ModuleCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  background: ${props => {
    if (props.$active) return '#2980B9';
    if (props.$completed) return '#dcfce7';
    return '#f3f4f6';
  }};
  color: ${props => {
    if (props.$active) return 'white';
    if (props.$completed) return '#15803d';
    return '#9ca3af';
  }};

  svg {
    width: 24px;
    height: 24px;
    margin: 0 auto 8px;
  }
`;

export const ModuleLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  display: block;
`;

export const AlertBox = styled.div`
  background: ${props => props.$bgColor || '#fef3c7'};
  border-left: 4px solid ${props => props.$borderColor || '#f59e0b'};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    flex-shrink: 0;
    margin-top: 4px;
  }
`;

export const TestCard = styled.div`
  background: ${props => props.$bgColor || '#eff6ff'};
  padding: 32px;
  border-radius: 16px;
  margin: 24px 0;
  text-align: center;
`;

export const WordButton = styled.button`
  background: white;
  border: 2px solid #d1d5db;
  padding: ${props => props.$large ? '24px 48px' : '16px 32px'};
  margin: 8px;
  border-radius: 12px;
  font-size: ${props => props.$large ? '2rem' : '1.5rem'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #1f2937;

  &:hover {
    border-color: ${props => props.$color || '#6DD5FA'};
    background: ${props => props.$hoverBg || '#eff6ff'};
    transform: scale(1);
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$cols || 'repeat(3, 1fr)'};
  gap: 16px;
  max-width: ${props => props.$maxWidth || 'none'};
  margin: 0 auto;
`;

export const TimerDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #6DD5FA;
  text-align: center;
  margin: 32px 0;
  font-family: 'Courier New', monospace;
`;

export const ReadingBox = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  border: 2px solid #dbeafe;
  margin: 24px 0;
  line-height: 1.8;
  font-size: ${props => props.$fontSize || '1.125rem'};
  color: #1f2937;
`;

export const ResultCard = styled.div`
  background: ${props => props.$bgColor || '#f0f9ff'};
  border-left: 4px solid ${props => props.$borderColor || '#0ea5e9'};
  padding: 24px;
  border-radius: 12px;
  margin: 16px 0;
`;

export const ResultTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${props => props.$color || '#1f2937'};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ExerciseCard = styled.div`
  border: 2px solid #e5e7eb;
  padding: 16px;
  border-radius: 12px;
  margin: 16px 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 16px;

  &:hover {
    border-color: #6DD5FA;
    transform: translateX(5px);
  }
`;

export const ExerciseNumber = styled.div`
  background: #dbeafe;
  color: #2980B9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

export const ExerciseContent = styled.div`
  flex: 1;
`;

export const ExerciseTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 4px;
  color: #1f2937;
`;

export const ExerciseDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 8px;
`;

export const ExerciseLink = styled.button`
  background: none;
  border: none;
  color: #2980B9;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6DD5FA;
  border-radius: 50%;
  margin: 0 auto;
  animation: ${spin} 1s linear infinite;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$justify || 'center'};
  margin: ${props => props.$margin || '0'};
  color: ${props => props.$color || '2980B9'};
  
  svg {
    width: ${props => props.$size || '24px'};
    height: ${props => props.$size || '24px'};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: ${props => props.$align || 'center'};
  justify-content: ${props => props.$justify || 'flex-start'};
  gap: ${props => props.$gap || '8px'};
  flex-direction: ${props => props.$direction || 'row'};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns || 'repeat(2, 1fr)'};
  gap: ${props => props.$gap || '24px'};
  margin: ${props => props.$margin || '0'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f3f4f6;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: left;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr; /* En PC se verán lado a lado */
  }
`;

export const OptionCard = styled.div`
  background: ${props => props.$primary 
    ? 'linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%)' 
    : '#f9fafb'};
  padding: 24px;
  border-radius: 16px;
  border: ${props => props.$primary ? '3px solid #6DD5FA' : '2px solid #e5e7eb'};
  box-shadow: ${props => props.$primary ? '0 10px 30px rgba(102, 126, 234, 0.3)' : 'none'};
  position: relative;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: -12px;
  right: 20px;
  background: #0F3460;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(15, 52, 96, 0.25);
`;

export const CardContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
`;

export const NumberCircle = styled.div`
  background: ${props => props.$primary ? 'white' : '#0F3460'};
  color: ${props => props.$primary ? '#2980B9' : 'white'};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const OptionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.$primary ? 'white' : '#1f2937'};
  margin: 0 0 10px 0;
`;

export const OptionDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.$primary ? 'rgba(255, 255, 255, 0.95)' : '#6b7280'};
  margin: 0 0 18px 0;
  line-height: 1.5;
`;