import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './public/screens/register.jsx';
import Login from './public/screens/login.jsx';
import BarberRoute from './barber/route/routes.jsx';

// Função principal que define as rotas da aplicação
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <BarberRoute/>
    </BrowserRouter>
  );
}

export default App;
