import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './public/screens/LoginForm.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de login */}
        <Route path="./public/screens/LoginForm.jsx" element={<LoginForm />} />

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
