import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../contexts/AuthContext';
import './RegisterForm.css'; // Importa o CSS do LoginForm

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

function RegisterForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState(null);
  const { register } = useContext(auth.Context);
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setError('As senhas não conferem');
      return;
    }
    try {
      setError(null);
      await register({ name, phone, password });
      // Pós‑cadastro: redireciona para login
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Erro no cadastro', err);
      setError('Não foi possível concluir o registro');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h1>CRIE SUA CONTA</h1>
        
        <FloatingInput
          id="name"
          label="Nome"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
          minLength={1}
        />
        <FloatingInput
          id="confirmPwd"
          label="Confirme a Senha"
          type="password"
          value={confirmPwd}
          onChange={e => setConfirmPwd(e.target.value)}
          minLength={1}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn primary">Registrar</button>
        <a href="/login" className="login-link">
          Já tenho conta
        </a>
      </form>
    </div>
  );
}

export default RegisterForm;
