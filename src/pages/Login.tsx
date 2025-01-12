import { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa'; // React icons for username and password
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect
import Logo from '../utils/Logo.png';
import { ENDPOINTS } from '../constants/apiEndpoints';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); /* Darker gradient with more contrast */
  justify-content: center;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
`;

const LogoImage = styled.img`
  width: 250px;  /* Increased logo size */
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); /* Logo shadow to make it pop */
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  background: #ffffff; /* Soft white for form background */
  border-radius: 12px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3); /* Increased shadow for form depth */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #4f46e5; /* Accent color for the title */
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for inputs */

  svg {
    margin-right: 0.75rem;
    color: #6366f1; /* Icon color */
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  background: transparent;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Increased shadow for button */

  &:hover {
    background-color: #4f46e5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(100, 100, 100, 0.3);
  }
`;

const ForgotPassword = styled.a`
  margin-top: 1rem;
  color: #6366f1;
  font-size: 0.9rem;
  text-align: center;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
  }
`;



const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const response = await axios.post(ENDPOINTS.login, { username, password });
      const { token } = response.data; // Extract the token from the response data
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
      setToken(token);
  
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred during login');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LogoSection>
        <LogoImage src={Logo} alt="Logo" />
      </LogoSection>
      <FormSection>
        <Title>Iniciar sesión</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <FaUser />
            <Input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <FaLock />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </InputWrapper>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Entrar'}
          </Button>
        </form>
        <ForgotPassword>¿Olvidaste tu contraseña?</ForgotPassword>
      </FormSection>
    </Container>
  );
};

const ErrorMessage = styled.div`
  color: #dc2626;
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.875rem;
`;

export default LoginPage;