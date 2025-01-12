import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import {
  Container,
  LoaderContainer,
  Header,
  Title,
  Controls,
  Input,
  Button,
  ViewToggle,
  ErrorMessage,
  StyledTable,
  GridView,
  Card,
  StatusBadge,
  LoadingOverlay,
  EditButtonCard,
  DeleteButtonCard,
  ActionButtonsContainer,
} from "../components/Styles";
import { User, Role } from "../types/interfaces";
import { FaEdit, FaTrashAlt, FaPlus, FaList, FaTh } from "react-icons/fa"; // React Icons
import ModalConfirm from "../components/ModalConfirm";
import { EditButton, DeleteButton } from "../components/Styles"; // Import the Edit and Delete buttons styled components

const UserScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, roleRes] = await Promise.all([
          axios.get("http://localhost:8080/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/roles", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(userRes.data || []);
        setRoles(roleRes.data || []);
        setError(null);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleSaveUser = async (user: User) => {
    try {
      const userToSave = {
        ...user,
        roleId: user.role.id, // Send only the roleId
        password: user.password || undefined, // Only send password if provided
      };

      if (user.id) {
        // Update user
        const response = await axios.put(
          `http://localhost:8080/api/users/${user.id}`,
          userToSave,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      } else {
        // Create new user
        const response = await axios.post(
          "http://localhost:8080/api/users",
          userToSave,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers((prev) => [...prev, response.data]);
      }
      setModalOpen(false);
    } catch (err) {
      setError("Error saving user. Please try again.");
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      if (!user) return;
      const response = await axios.delete(
        `http://localhost:8080/api/users/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setDeletingUser(null); // Close the modal after deleting
    } catch (err) {
      setError("Error deleting user. Please try again.");
      setDeletingUser(null);
    }
  };

  const handleOpenConfirmDelete = (user: User) => {
    setDeletingUser(user);
    setConfirmOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmOpen(false);
    setDeletingUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>Usuarios</Title>
        <Controls>
          <Input
            placeholder="Buscar usuarios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => {
              setEditingUser(null);
              setModalOpen(true);
            }}
          >
            <FaPlus /> Nuevo
          </Button>
          <ViewToggle>
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              <FaList /> Tabla
            </button>
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
            >
              <FaTh /> Cuadrícula
            </button>
          </ViewToggle>
        </Controls>
      </Header>

      {loading && (
        <LoaderContainer>
          <LoadingOverlay>
            <Loader />
          </LoadingOverlay>
        </LoaderContainer>
      )}

      {!loading && error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && filteredUsers.length === 0 && (
        <ErrorMessage>
          No se encontraron usuarios que coincidan con la búsqueda.
        </ErrorMessage>
      )}

      {!loading &&
        !error &&
        filteredUsers.length > 0 &&
        (view === "list" ? (
          <StyledTable>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                    <StatusBadge isActive={!!user.role.id}>
                      {user.role.id ? "Activo" : "Inactivo"}
                    </StatusBadge>
                  </td>
                  <td>
                    <ActionButtonsContainer>
                      <EditButton
                        onClick={() => {
                          setEditingUser(user);
                          setModalOpen(true);
                        }}
                      >
                        <FaEdit />
                      </EditButton>
                      <DeleteButton
                        onClick={() => handleOpenConfirmDelete(user)} // Open delete confirmation modal
                      >
                        <FaTrashAlt />
                      </DeleteButton>
                    </ActionButtonsContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <GridView>
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <strong>{user.name}</strong>
                <p>@{user.username}</p>
                <p>{user.email}</p>
                <p>Rol: {user.role.name}</p>
                <StatusBadge isActive={!!user.role.id}>
                  {user.role.id ? "Activo" : "Inactivo"}
                </StatusBadge>
                <div>
                  <ActionButtonsContainer>
                    <EditButtonCard
                      onClick={() => {
                        setEditingUser(user);
                        setModalOpen(true);
                      }}
                    >
                      <FaEdit /> Editar
                    </EditButtonCard>
                    <DeleteButtonCard
                      onClick={() => handleOpenConfirmDelete(user)} // Open delete confirmation modal
                    >
                      <FaTrashAlt /> Eliminar
                    </DeleteButtonCard>
                  </ActionButtonsContainer>
                </div>
              </Card>
            ))}
          </GridView>
        ))}

      {modalOpen && (
        <Modal
          title={editingUser ? "Editar Usuario" : "Nuevo Usuario"}
          onClose={() => setModalOpen(false)}
        >
          <UserForm
            user={editingUser}
            roles={roles}
            onSave={handleSaveUser}
            onDelete={handleDeleteUser} // Delete logic is now handled outside the modal
          />
        </Modal>
      )}

      {confirmOpen && (
        <ModalConfirm
          title="Confirmar Eliminación"
          message="¿Estás seguro de que deseas eliminar este usuario?"
          onConfirm={() => handleDeleteUser(deletingUser!)} // Make sure deletingUser is not null
          onCancel={handleCloseConfirmDelete}
        />
      )}
    </Container>
  );
};

export default UserScreen;
