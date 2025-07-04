import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../contexts/AuthContext';

export default function HomeRedirect() {
  const { user } = useContext(auth.Context);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role_id === 1) {
    return <Navigate to="/barber" replace />;
  }

  if (user.role_id === 2) {
    return <Navigate to="/client" replace />;
  }

  return <Navigate to="/login" replace />;
}
