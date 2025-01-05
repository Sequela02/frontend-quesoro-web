import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import GroupScreen from './pages/GroupScreen';
import RoutesScreen from './pages/RoutesScreen';
import UsersScreen from './pages/UserScreen';
import SpinsScreen from './pages/SpinsScreen';
import Login from './pages/Login';

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
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/groups" element={<GroupScreen />} />
            <Route path="/routes" element={<RoutesScreen />} />
            <Route path="/users" element={<UsersScreen />} />
            <Route path="/spins" element={<SpinsScreen />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;