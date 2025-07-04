import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './public/screens/login/LoginForm.jsx';
import RegisterForm from './public/screens/register/RegisterForm.jsx';

import HomeRedirect from './components/HomeRedirect.jsx';
import BarberHome from './private/screens/BarberHome.jsx';
import ClientHome from './private/screens/ClientHome.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Rota pública de registro */}
        <Route path="/register" element={<RegisterForm />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomeRedirect />
            </PrivateRoute>
          }
        />
        <Route
          path="/barber"
          element={
            <PrivateRoute>
              <BarberHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/client"
          element={
            <PrivateRoute>
              <ClientHome />
            </PrivateRoute>
          }
        />
        

        {/* Rota padrão redireciona para /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rotas privadas
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
