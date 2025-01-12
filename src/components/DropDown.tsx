import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface DropDownProps {
  disabled?: boolean;
  children: React.ReactNode;
  trigger: React.ReactNode;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropDownTrigger = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1rem;
  background: transparent;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => !props.disabled && '#f8f8f8'};
    border-color: ${props => !props.disabled && '#ddd'};
  }
`;

const DropDownContent = styled.div.attrs<{ $isOpen: boolean; $position: string }>(
  ({ $isOpen, $position }) => ({
    style: {
      opacity: $isOpen ? 1 : 0,
      visibility: $isOpen ? 'visible' : 'hidden',
      transform: $isOpen ? 'translateY(0)' : 'translateY(-8px)',
    },
  })
)`
  position: absolute;
  ${props => (props.$position.includes('bottom') ? 'top: 100%;' : 'bottom: 100%;')}
  ${props => (props.$position.includes('right') ? 'right: 0;' : 'left: 0;')}
  min-width: 200px;
  background: white;
  border-radius: 8px;
  margin-top: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
`;

const DropDownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }
`;

const Separator = styled.div`
  height: 1px;
  background: #eaeaea;
  margin: 0.5rem 0;
`;

const DropDown: React.FC<DropDownProps> = ({
  disabled,
  children,
  trigger,
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropDownContainer ref={dropdownRef}>
      <DropDownTrigger onClick={() => !disabled && setIsOpen(!isOpen)} disabled={disabled}>
        {trigger}
      </DropDownTrigger>
      <DropDownContent $isOpen={isOpen} $position={position}>
        {children}
      </DropDownContent>
    </DropDownContainer>
  );
};

export { DropDown, DropDownItem, Separator };
export default DropDown;