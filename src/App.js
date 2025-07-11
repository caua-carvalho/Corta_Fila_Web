// Gerado pelo Copilot
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './public/screens/register.jsx';
import Login from './public/screens/login.jsx';
import BarberDashboard from './barber/screens/BarberDashboard.jsx';
import BarberRoute from './barber/components/BarberRoute.jsx';
import BarberRegister from './barber/screens/InfosBarber.jsx';

// Função principal que define as rotas da aplicação
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Rotas protegidas do barbeiro */}
        <Route
          path="/barber"
          element={(
            <BarberRoute>
              <BarberDashboard />
            </BarberRoute>
          )}
        />
        <Route
          path="/barber/infos"
          element={(
            <BarberRoute>
              <BarberRegister />
            </BarberRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
