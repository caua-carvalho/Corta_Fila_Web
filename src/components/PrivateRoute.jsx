// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  // Se não está logado, redireciona para /login
  if (!user) return <Navigate to="login" replace />;
  return children;
}
