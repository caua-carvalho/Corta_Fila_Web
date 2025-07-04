import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import icone from '../../../assets/icons/google.png';
import './LoginForm.css';

function FloatingInput({ id, label, type, value, onChange, minLength }) {
  return (
    <div className="floating-input">
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

function LoginForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signIn, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      setError(null);
      await signIn(phone, password);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error('Erro ao autenticar', err);
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="login-container">
      <h1>AGENDA</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <FloatingInput
          id="phone"
          label="Telefone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <FloatingInput
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}

        <a href="#" className="forgot-link">Esqueci minha senha</a>

        <button type="submit" className="btn primary">Entrar</button>

        <a href="/register" className="register-link">Quero me cadastrar</a>
      </form>
    </div>
  );
}

export default LoginForm;
