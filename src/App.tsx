import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import GroupScreen from './pages/GroupScreen';
import RoutesScreen from './pages/RoutesScreen';
import UsersScreen from './pages/UserScreen';
import SpinsScreen from './pages/SpinsScreen';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import axios from 'axios';

function AuthenticatedLayout() {
  return (
    <div className="App" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

function NotFound() {
  return <div>404 - Page Not Found</div>;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isLoggedIn ? (
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<GroupScreen />} />
          <Route path="/routes" element={<RoutesScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/spins" element={<SpinsScreen />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;