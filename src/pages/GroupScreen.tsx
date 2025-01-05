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

const GroupCard = styled.div`
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

interface Group {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

const GroupScreen: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/groups');
        setGroups(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch groups. Please try again later.');
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <LoadingOverlay>Loading groups...</LoadingOverlay>
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
          Groups
        
        </Title>
        <Controls>
          <Input
            placeholder="Search groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Add New Group</Button>
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
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group) => (
              <tr key={group.id}>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td>
                  <StatusBadge isActive={group.isActive}>
                    {group.isActive ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <GridView>
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
            >
              <ActionMenu>⋮</ActionMenu>
              <strong>{group.name}</strong>
              <p>{group.description}</p>
              <StatusBadge isActive={group.isActive}>
                {group.isActive ? 'Active' : 'Inactive'}
              </StatusBadge>
            </GroupCard>
          ))}
        </GridView>
      )}
    </Container>
  );
};

export default GroupScreen;