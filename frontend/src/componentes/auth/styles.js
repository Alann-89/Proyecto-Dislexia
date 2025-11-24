import styled, { keyframes } from 'styled-components';

// Animaciones
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

// Styled Components
export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2980B9 0%, #0F3460 50%, #6DD5FA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -250px;
    left: -250px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    bottom: -200px;
    right: -200px;
  }
`;


export const AuthContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: white;
  border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

export const LeftPanel = styled.div`
  background: linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%);
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 968px) {
    display: none;
  }
`;


export const FloatingIcon = styled.div`
  animation: ${float} 3s ease-in-out infinite;
  margin-bottom: 32px;
`;

export const LeftTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

export const LeftText = styled.p`
  font-size: 1.125rem;
  text-align: center;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 32px;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 1rem;
  opacity: 0.9;

  svg {
    flex-shrink: 0;
  }
`;

export const RightPanel = styled.div`
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  justify-content: center;

  @media (min-width: 969px) {
    display: none;
  }
`;

export const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 32px;
  font-size: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: #9ca3af;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid ${props => props.$error ? '#ef4444' : '#e5e7eb'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${props => props.$error ? '#ef4444' : '#6DD5FA'};
    box-shadow: 0 0 0 3px ${props => props.$error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #6DD5FA;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 8px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6DD5FA;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #9ca3af;
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  span {
    padding: 0 16px;
  }
`;

export const Link = styled.a`
  color: #2980B9;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #6DD5FA;
    text-decoration: underline;
  }
`;

export const TextCenter = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #6b7280;
  font-size: 0.875rem;
`;