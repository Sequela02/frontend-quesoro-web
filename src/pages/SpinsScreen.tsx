import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  ViewToggle,
  StatusBadge,
  Header,
  Title,
  Controls,
  Input,
  Button,
  StyledTable,
  GridView,
  ErrorMessage,
  LoadingOverlay, LoaderContainer
} from "../components/Styles";
import Loader from "../components/Loader";
import { Spin } from "../types/interfaces";

const SpinsScreen: React.FC = () => {
  const [spins, setSpins] = useState<Spin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpins = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/spins");
        if (response.data && response.data.length > 0) {
          setSpins(response.data);
          setError(null);
        } else {
          setError("No hay datos disponibles para mostrar.");
        }
      } catch (error) {
        console.error("Error al obtener los spins:", error);
        setError(
          "No se pudo conectar con el backend. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSpins();
  }, []);

  const filteredSpins = spins.filter((spin) =>
    spin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>Giros</Title>
        <Controls>
          <Input
            placeholder="Buscar giro..."
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

      {!loading && error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && filteredSpins.length === 0 && (
        <ErrorMessage>
          No se encontraron spins que coincidan con la búsqueda.
        </ErrorMessage>
      )}

      {!loading &&
        !error &&
        filteredSpins.length > 0 &&
        (view === "list" ? (
          <StyledTable>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpins.map((spin) => (
                <tr key={spin.id}>
                  <td>{spin.name}</td>
                  <td>{spin.description}</td>
                  <td>
                    <StatusBadge isActive={spin.isActive}>
                      {spin.isActive ? "Activo" : "Inactivo"}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <GridView>
            {filteredSpins.map((spin) => (
              <Card key={spin.id}>
                <strong>{spin.name}</strong>
                <p>{spin.description}</p>
                <StatusBadge isActive={spin.isActive}>
                  {spin.isActive ? "Activo" : "Inactivo"}
                </StatusBadge>
              </Card>
            ))}
          </GridView>
        ))}
    </Container>
  );
};

export default SpinsScreen;
