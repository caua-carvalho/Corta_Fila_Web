import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarberPage from './pages/BarberPage';
import LoginPage from './pages/LoginPage';
import BarberAuthPage from './pages/BarberAuthPage';
import BarberDashboard from './pages/BarberDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BarberPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/barber/login" element={<BarberAuthPage />} />
        <Route
          path="/barber"
          element={
            <ProtectedRoute>
              <BarberDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
