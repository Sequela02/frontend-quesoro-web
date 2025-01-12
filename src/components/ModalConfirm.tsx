// components/ModalConfirm.tsx
import React from 'react';
import { ModalContainer, ModalContent, CloseButton, ActionButton } from './Styles';

interface ModalConfirmProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <h2>{title}</h2>
        <p>{message}</p>
        <div>
          <ActionButton onClick={onConfirm} style={{ marginRight: '10px' }}>
            Sí
          </ActionButton>
          <ActionButton onClick={onCancel}>Cancelar</ActionButton>
        </div>
        <CloseButton onClick={onCancel}>X</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalConfirm;
