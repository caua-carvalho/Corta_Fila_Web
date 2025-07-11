import React, { useState } from 'react';
import FloatingInput from '../components/FloatingInput.css/FloatingInput.jsx';
import { loginBarber } from '../../services/auth.js';
import { useNavigate } from 'react-router-dom';
import '../../styles/screens.css';

export default function Login() {
  const [form, setForm] = useState({ telefone: '', senha: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginBarber(form.telefone, form.senha);
      if (user === 'success') {
        navigate('/barber');
      } else {
        setError('Usuário não é barbeiro.');
      }
    } catch (err) {
      setError('Falha no login');
    }
  };

  return (
    <div className="screen-container">
      <div className="screen-card">
        <h1 className="screen-title">ENTRAR</h1>
        <form onSubmit={handleSubmit} className="screen-form">
          <FloatingInput
            label="Telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            type="tel"
          />
          <FloatingInput
            label="Senha"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            type="password"
          />
          {error && <span className="screen-error">{error}</span>}
          <button type="submit" className="screen-button">
            ENTRAR
          </button>
        </form>
        <p className="screen-footer-link">
          Não possui Conta?{' '}
          <a href="/register" className="screen-link-anchor">
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
}

