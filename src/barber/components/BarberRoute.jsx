import React from 'react';
import { Navigate } from 'react-router-dom';
import { isBarberAuthenticated } from '../../services/auth.js';

export default function BarberRoute({ children }) {
  if (!isBarberAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
