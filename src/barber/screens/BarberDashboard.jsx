import React from 'react';
import { logout, getCurrentUser, infoBarber } from '../../services/auth.js';
import '../../styles/screens.css';

if (infoBarber() === null) {
  window.location.href = '/barber/register';
}

export default function BarberDashboard() {
  const user = getCurrentUser();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bem-vindo, {user?.name}</h1>
      <p className="dashboard-text">Esta é uma area restrita para barbeiros.</p>
      <button className="dashboard-button" onClick={logout}>
        Sair
      </button>
    </div>
  );
}

