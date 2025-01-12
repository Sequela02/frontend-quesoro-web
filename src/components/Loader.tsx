import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.8);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

const Spinner = styled.div`
  width: 48px;  // Doubled size
  height: 48px; // Doubled size
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    #3182CE 0%,
    rgba(49, 130, 206, 0.2) 100%
  );
  box-shadow: 0 0 20px rgba(49, 130, 206, 0.2); // Increased shadow
  animation: ${spin} 1.4s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    width: 48px;  // Matched with parent
    height: 48px; // Matched with parent
    border-radius: 50%;
    background: white;
    transform: scale(0.8);
    top: 0;
    left: 0;
  }
`;

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
};

export default Loader;