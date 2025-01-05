// Definimos los endpoints del backend
export const API_BASE_URL = "http://localhost:8080/api"; // URL base de la API

export const ENDPOINTS = {
  // Rutas para los grupos
  groups: `${API_BASE_URL}/groups`,
  
  // Rutas para los usuarios
  users: `${API_BASE_URL}/users`,
  
  // Rutas para los roles
  roles: `${API_BASE_URL}/roles`,
  
  // Rutas para los giros
  spins: `${API_BASE_URL}/spins`,
  
  // Rutas para las rutas
  routes: `${API_BASE_URL}/routes`,

  // Otros endpoints...
};
