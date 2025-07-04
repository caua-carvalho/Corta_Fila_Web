// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(auth.Context);
  // Enquanto valida a sessão, não renderiza nada
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
