import React, { useContext } from 'react';
import auth from '../../contexts/AuthContext';
import '../../public/screens/login/LoginForm.css';

function BarberHome() {
  const { signOut, user } = useContext(auth.Context);
  return (
    <div className="login-container">
      <h1>Bem-vindo Barbeiro {user?.name}</h1>
      <button onClick={signOut} className="btn primary">Sair</button>
    </div>
  );
}

export default BarberHome;
