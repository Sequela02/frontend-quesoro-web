import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Card, LoaderContainer, ViewToggle, StatusBadge, Header, Title, Controls, Input, 
  Button, StyledTable, GridView, ErrorMessage, LoadingOverlay 
} from '../components/Styles';
import { Group } from '../types/interfaces';
import Loader from '../components/Loader';

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
        if (response.data && response.data.length > 0) {
          setGroups(response.data);
          setError(null);
        } else {
          setError('No hay datos de grupos disponibles.');
        }
      } catch (error) {
        setError('Error al obtener los grupos. Intenta nuevamente más tarde.');
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

  return (
    <Container>
      <Header>
        <Title>Grupos</Title>
        <Controls>
          <Input
            placeholder="Buscar grupos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Nuevo</Button>
          <ViewToggle>
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              Vista de tabla
            </button>
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
            >
              Vista en cuadrícula
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

      {!loading && error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      {!loading && !error && filteredGroups.length === 0 && (
        <ErrorMessage>No se encontraron grupos que coincidan con la búsqueda.</ErrorMessage>
      )}

      {!loading && !error && filteredGroups.length > 0 && (
        view === "list" ? (
          <StyledTable>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.map((group) => (
                <tr key={group.id}>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td>
                    <StatusBadge isActive={group.isActive}>
                      {group.isActive ? 'Activo' : 'Inactivo'}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <GridView>
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
              >
                <strong>{group.name}</strong>
                <p>{group.description}</p>
                <StatusBadge isActive={group.isActive}>
                  {group.isActive ? 'Activo' : 'Inactivo'}
                </StatusBadge>
              </Card>
            ))}
          </GridView>
        )
      )}
    </Container>
  );
};

export default GroupScreen;
