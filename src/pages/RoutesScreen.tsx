import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, LoaderContainer, Card, ViewToggle, StatusBadge, Header, Title, Controls, 
  Input, Button, StyledTable, GridView, ErrorMessage, LoadingOverlay 
} from '../components/Styles';
import { Route } from '../types/interfaces';
import Loader from '../components/Loader';

const RoutesScreen: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/routes');
        if (response.data && response.data.length > 0) {
          setRoutes(response.data);
          setError(null);
        } else {
          setError('No hay datos de rutas disponibles.');
        }
      } catch (error) {
        setError('Error al obtener las rutas. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>Rutas</Title>
        <Controls>
          <Input
            placeholder="Buscar rutas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Nueva</Button>
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

      {!loading && !error && filteredRoutes.length === 0 && (
        <ErrorMessage>No se encontraron rutas que coincidan con la búsqueda.</ErrorMessage>
      )}

      {!loading && !error && filteredRoutes.length > 0 && (
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
              {filteredRoutes.map((route) => (
                <tr key={route.id}>
                  <td>{route.name}</td>
                  <td>{route.description}</td>
                  <td>
                    <StatusBadge isActive={route.isActive}>
                      {route.isActive ? 'Activo' : 'Inactivo'}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <GridView>
            {filteredRoutes.map((route) => (
              <Card key={route.id}>
                <strong>{route.name}</strong>
                <p>{route.description}</p>
                <StatusBadge isActive={route.isActive}>
                  {route.isActive ? 'Activo' : 'Inactivo'}
                </StatusBadge>
              </Card>
            ))}
          </GridView>
        )
      )}
    </Container>
  );
};

export default RoutesScreen;
