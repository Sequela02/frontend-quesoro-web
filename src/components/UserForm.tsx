import React, { useState, useEffect } from 'react';
import { Input, Button, FormContainer, FormGroup, Label, Select } from './Styles';
import { User, Role } from '../types/interfaces';
import ModalConfirm from './ModalConfirm';

interface UserFormProps {
  user: User | null;
  roles: Role[];
  onSave: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, roles, onSave, onDelete }) => {
  const [formData, setFormData] = useState<User>({
    id: undefined, // id should be undefined for new users
    name: '',
    username: '',
    email: '',
    password: '',
    role: roles[0] || { id: 0, name: '' }, // Default to first role if no user
  });
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: '' }); // Don't show password when editing
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    setSaveConfirmOpen(true); // Open the confirmation modal
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userToSave = {
      ...formData,
      roleId: formData.role.id, // Send only roleId
      password: formData.password || undefined, // Only include password if provided
    };

    console.log('Sending user data to save:', userToSave);

    if (formData.id === undefined) {
      delete userToSave.id; // Remove id for new users
    }

    onSave(userToSave);
  };


  const handleConfirmSave = () => {
    const userToSave = {
      ...formData,
      roleId: formData.role.id, // Send only roleId
      password: formData.password || undefined, // Only include password if provided
    };

    console.log('Confirming save for user:', userToSave);

    if (formData.id === undefined) {
      delete userToSave.id; // Remove id for new users
    }

    onSave(userToSave);
    setSaveConfirmOpen(false); // Close the confirmation modal after saving
  };

  return (
    <FormContainer>
      <FormGroup>
        <Label>Nombre:</Label>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label>Nombre de usuario:</Label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Correo electrónico:</Label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </FormGroup>

      {!user && (
        <FormGroup>
          <Label>Contraseña:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
      )}

      <FormGroup>
        <Label>Rol:</Label>
        <Select
          name="role"
          value={formData.role.id}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: roles.find((role) => role.id === parseInt(e.target.value)) || formData.role,
            })
          }
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Button type="button" onClick={handleSave}>
        Guardar
      </Button>


     

      {saveConfirmOpen && (
        <ModalConfirm
          title="Confirmación de guardado"
          message="¿Estás seguro de que deseas guardar este usuario?"
          onConfirm={handleConfirmSave}
          onCancel={() => setSaveConfirmOpen(false)}
        />
      )}
    </FormContainer>
  );
};

export default UserForm;
