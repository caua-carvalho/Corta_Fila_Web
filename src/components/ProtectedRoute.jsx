import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const barberId = localStorage.getItem('barber_id');
  return barberId ? children : <Navigate to="/barber/login" replace />;
}

export default ProtectedRoute;
