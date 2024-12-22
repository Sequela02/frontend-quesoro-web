import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;