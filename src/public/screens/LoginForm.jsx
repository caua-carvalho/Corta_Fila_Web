import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '../../App.js';
import icone from '../../assets/icons/google.png';


function FloatingInput({ id, label, type, value, onChange, minLength }) {
  return (
    <div className="floating-input">
      {/* placeholder só para ativar :placeholder-shown */}
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        required
        {...(minLength ? { minLength } : {})}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function App() {
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await signIn(phone, password); // the login() function in auth.js will run
      // Optionally redirect to a protected route
    } catch (err) {
      console.error('Erro ao autenticar', err);
    }
  };

  return (
    <div className="login-container">
      <h1>AGENDA</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <FloatingInput
          id="phone"
          label="Telefone"
          type="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <FloatingInput
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
        />
        <a href="#" className="forgot-link">Esqueci minha senha</a>

        <button type="submit" className="btn primary">Entrar</button>
        <a href="#" className="register-link">Quero me cadastrar</a>

        <button type="button" className="btn social google">
          <img src={icone} alt="Google Icon" style={{ width: 18, height: 18, marginRight: 8 }}/>
          Entrar com Google
        </button>

        <a href="#" className="professional-link">
          Fazer login como <strong>Professional</strong>
        </a>
      </form>
    </div>
  );
}

export default App;
