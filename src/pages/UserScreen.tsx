import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
`;


const Controls = styled.div`
  display: flex;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  flex: 1;
  font-size: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 8px;

  button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;

    &.active {
      background-color: #333;
      color: white;
    }
  }
`;

const ListView = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
`;

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const UserCard = styled.div`
  position: relative;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => props.isActive ? '#4CAF50' : '#F44336'};
  color: white;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
  }
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  padding: 16px;
  border: 1px solid #f44336;
  border-radius: 8px;
  margin: 16px 0;
`;

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

const UserScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch users. Please try again later.');
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <LoadingOverlay>Loading users...</LoadingOverlay>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          Users
       
        </Title>
        <Controls>
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Add New User</Button>
          <ViewToggle>
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              List View
            </button>
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
            >
              Grid View
            </button>
          </ViewToggle>
        </Controls>
      </Header>

      {view === "list" ? (
        <StyledTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roleId}</td>
                <td>
                  <StatusBadge isActive={user.roleId !== 0}>
                    {user.roleId !== 0 ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <GridView>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              onClick={() => setActiveUser(user.id)}
            >
              <ActionMenu>⋮</ActionMenu>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
              <StatusBadge isActive={user.roleId !== 0}>
                {user.roleId !== 0 ? 'Active' : 'Inactive'}
              </StatusBadge>
            </UserCard>
          ))}
        </GridView>
      )}
    </Container>
  );
};

export default UserScreen;