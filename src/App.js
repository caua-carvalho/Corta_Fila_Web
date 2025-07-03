import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './public/screens/LoginForm.jsx';
import Home from './public/screens/home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Home" element={<Home />} />
        

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
