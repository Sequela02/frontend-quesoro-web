import styled from "styled-components";

export const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: #fff;
  border-radius: 32px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #111;
  display: flex;
  align-items: center;
`;

export const Controls = styled.div`
  display: flex;
  gap: 24px;
`;

export const Input = styled.input`
  padding: 16px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  flex: 1;
  font-size: 1.1rem;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #111;
  border: none;
  border-radius: 32px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  
  /* Space between text and icon */
  gap: 8px; /* Adjust the gap between the icon and text if needed */

  &:hover {
    background-color: #333;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #000;
  }

  /* Optional: Icon adjustments (if the icon is an SVG or image) */
  svg, img {
    width: 1.2rem; /* Set the icon size */
    height: 1.2rem;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 16px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: transparent;
    border-radius: 32px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    
    /* Space between text and icon */
    gap: 8px; /* Adjust the gap between the icon and text if needed */

    &.active {
      background-color: #111;
      color: white;
    }

    &:hover {
      background-color: #f8f8f8;
    }

    /* Optional: Icon adjustments (if the icon is an SVG or image) */
    svg, img {
      width: 1.2rem; /* Set the icon size */
      height: 1.2rem;
    }
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #fefefe;
  }
`;

export const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 32px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
`;

export const Card = styled.div`
  position: relative;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 400px;  // Set a maximum width for consistency

  display: flex;
  flex-direction: column;
  gap: 16px;  // Add spacing between items
  
  &:hover {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-6px);
  }

  strong {
    font-size: 18px;
    font-weight: 600;  // Make the name stand out
  }

  p {
    margin: 0;  // Remove default margin on paragraphs
    font-size: 14px;
    color: #555;  // Use a darker color for text for better readability
  }

  // Add the buttons inside the card container and make them expand
  .card-button-container {
    display: flex;
    flex-direction: column;
    gap: 12px;

    button {
      width: 100%;  // Make buttons expand to the full width
      padding: 12px 20px;
      border: 1px solid #ddd;
      background-color: #111;
      color: white;
      border-radius: 32px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease, transform 0.3s ease;

      &:hover {
        background-color: #333;
      }

      &:active {
        transform: scale(0.98);  // A slight "press" effect on button press
      }
    }
  }
`;


export const StatusBadge = styled.span<{ isActive: boolean }>`
  padding: 6px 12px;  // Slightly smaller padding for better balance
  border-radius: 12px;  // A bit smaller border radius for a more subtle effect
  font-size: 0.85rem;  // A more moderate font size
  font-weight: 600;  // Still bold but not too heavy
  background-color: ${props => props.isActive ? '#388E3C' : '#D32F2F'};  // Muted green for active, deeper red for inactive
  color: white;
  text-align: center;  // Ensure text is centered in the badge
  display: inline-block;  // Make sure it wraps nicely around the text
  transition: background-color 0.3s ease;  // Add a smooth transition for color change
  
  &:hover {
    background-color: ${props => props.isActive ? '#2E7D32' : '#C62828'};  // Slightly darker on hover
  }
`;


export const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 32px;
`;

export const ErrorMessage = styled.div`
  color: #f44336;
  padding: 24px;
  border: 1px solid #f44336;
  border-radius: 32px;
  background-color: #fff5f5;
  margin: 16px 0;
  text-align: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Mantener el fondo oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 32px;
  border-radius: 32px;
  width: 90%; /* Cambiar a un porcentaje para hacerlo más flexible */
  max-width: 500px; /* Limitar el ancho máximo a 500px */
  position: relative;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto; /* Añadir desplazamiento vertical si es necesario */
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 16px; /* Ajustar posición */
  right: 16px; /* Ajustar posición */
  background: transparent;
  border: none;
  font-size: 24px; /* Aumentar tamaño para mayor visibilidad */
  color: #111; /* Color de texto más oscuro */
  cursor: pointer;

  &:hover {
    color: #007bff; /* Color similar al botón principal */
  }
`;

export const ActionButton = styled.button`
  padding: 14px 24px; /* Tamaño de padding más consistente con los botones */
  border: none;
  background-color: #111; /* Fondo oscuro */
  color: white;
  cursor: pointer;
  border-radius: 32px; /* Bordes redondeados consistentes */
  font-size: 1.1rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #333; /* Color de hover más suave */
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2); /* Sombra más sutil */
  }

  &:active {
    background-color: #000; /* Fondo más oscuro al hacer clic */
  }
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px; /* Reducir el padding para evitar que se desborde */
  background-color: #fff;
  border-radius: 32px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%; /* Ajuste al 100% para que ocupe todo el espacio disponible */
  max-width: 480px; /* Establecer un máximo para que no sea demasiado grande */
  margin: 0 auto;
  overflow-y: auto; /* Permite desplazarse si el contenido es demasiado largo */
`;


export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  color: #333;
  font-weight: 600; /* Negrita para mejor visibilidad */
`;

export const Select = styled.select`
  padding: 12px 24px;
  border: 1px solid #ddd;
  border-radius: 32px;
  background-color: #fafafa;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
  appearance: none;
  outline: none;
  width: 100%;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6"%3E%3Cpath fill="none" stroke="%23333" stroke-width="2" d="M1 1l4 4 4-4"%3E%3C/path%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px 8px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
  }

  /* Customizing dropdown items */
  option {
    background-color: #fafafa; /* Matching background with the select box */
    color: #333; /* Text color */
    padding: 12px 24px; /* Spacing for options */
    font-size: 1rem;
    transition: background-color 0.2s ease, color 0.2s ease; /* Smooth transitions for hover effect */

    /* Optional custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    &:hover {
      background-color: #f0f0f0; /* Light hover effect */
      color: #007bff; /* Change text color on hover */
    }

    &:active {
      background-color: #e0e0e0; /* Slightly darker on click */
    }
  }
`;
// Base IconButton styled component
// Base IconButton styled component
export const IconButton = styled.button`
  padding: 12px;
  border: none;
  background-color: #4f8ef7; /* Soft blue color for the button background */
  color: white; /* White icon color for contrast */
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #3581d1; /* Darker shade for hover */
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #2a6ca4; /* Even darker for active state */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

// Edit Button variant with a more muted background color
export const EditButton = styled(IconButton)`
  background-color: #388e3c; /* Muted green for edit */
  
  &:hover {
    background-color: #2e7d32; /* Slightly darker green for hover */
  }

  &:active {
    background-color: #1b5e20; /* Even deeper green for active state */
  }
`;

// Delete Button variant with a more subtle red background color
export const DeleteButton = styled(IconButton)`
  background-color: #d32f2f; /* Muted red for delete */
  
  &:hover {
    background-color: #c62828; /* Slightly darker red for hover */
  }

  &:active {
    background-color: #b71c1c; /* Even deeper red for active state */
  }
`;

// Edit Button Card with more muted green
export const EditButtonCard = styled(Button)`
  background-color: #388e3c; /* Muted green for edit */
  
  &:hover {
    background-color: #2e7d32; /* Slightly darker green for hover */
  }

  &:active {
    background-color: #1b5e20; /* Even deeper green for active state */
  }
`;

// Delete Button Card with a deeper red tone
export const DeleteButtonCard = styled(Button)`
  background-color: #d32f2f; /* Muted red for delete */
  
  &:hover {
    background-color: #c62828; /* Slightly darker red for hover */
  }

  &:active {
    background-color: #b71c1c; /* Even deeper red for active state */
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;  // Adjust the gap between buttons as needed
`;