// components/Modal.tsx
import React from 'react';
import { ModalContainer, ModalContent, CloseButton } from './Styles';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <h2>{title}</h2>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
