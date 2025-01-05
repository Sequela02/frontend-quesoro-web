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

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const SpinCard = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
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

const StatusBadge = styled.span<{ isActive: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => props.isActive ? '#4CAF50' : '#F44336'};
  color: white;
`;

interface Spin {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

const SpinsScreen: React.FC = () => {
  const [spins, setSpins] = useState<Spin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  useEffect(() => {
    const fetchSpins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/spins');
        setSpins(response.data);
      } catch (error) {
        console.error('Error fetching spins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpins();
  }, []);

  const filteredSpins = spins.filter((spin) =>
    spin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>
        <Title>Spins</Title>
        <Controls>
          <Input
            placeholder="Search spins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Add New Spin</Button>
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
            {filteredSpins.map((spin) => (
              <tr key={spin.id}>
                <td>{spin.name}</td>
                <td>{spin.description}</td>
                <td>
                  <StatusBadge isActive={spin.isActive}>
                    {spin.isActive ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <GridView>
          {filteredSpins.map((spin) => (
            <SpinCard key={spin.id}>
              <strong>{spin.name}</strong>
              <p>{spin.description}</p>
              <StatusBadge isActive={spin.isActive}>
                {spin.isActive ? 'Active' : 'Inactive'}
              </StatusBadge>
            </SpinCard>
          ))}
        </GridView>
      )}
    </Container>
  );
};

export default SpinsScreen;