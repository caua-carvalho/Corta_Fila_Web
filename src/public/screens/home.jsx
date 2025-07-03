import React, { useContext } from 'react';
import './LoginForm.css';
import { AuthContext } from '../../contexts/AuthContext';

function Home() {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="login-container">
      <h1>AGENDA</h1>
      <button onClick={signOut} className="btn primary">Sair</button>
    </div>
  );
}

export default Home;
