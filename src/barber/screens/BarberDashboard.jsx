import React from 'react';
import { logout, getCurrentUser, infoBarber } from '../../services/auth.js';

if (infoBarber() === null) {
  window.location.href = '/barber/register';
}

export default function BarberDashboard() {
  const user = getCurrentUser();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo, {user?.name}</h1>
      <p style={styles.text}>Esta é uma area restrita para barbeiros.</p>
      <button style={styles.button} onClick={logout}>
        Sair
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#171717',
    color: '#fff',
  },
  title: {
    fontSize: '32px',
    color: '#C38A42',
  },
  text: {
    marginTop: '16px',
    fontSize: '18px',
  },
  button: {
    marginTop: '24px',
    padding: '10px 20px',
    backgroundColor: '#C38A42',
    color: '#171717',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
