import React, { useState } from 'react';
import FloatingInput from '../components/FloatingInput.css/FloatingInput.jsx';
import { loginBarber } from '../../services/auth.js';
import { useNavigate } from 'react-router-dom';

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
      if (user.role === 'barbeiro') {
        navigate('/barber');
      } else {
        setError('Usuário não é barbeiro.');
      }
    } catch (err) {
      setError('Falha no login');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>ENTRAR</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
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
          {error && <span style={styles.error}>{error}</span>}
          <button type="submit" style={styles.button}>
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#171717',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#1f1f1f',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#C38A42',
    fontSize: '32px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    marginBottom: '24px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  button: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#C38A42',
    color: '#171717',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  error: {
    color: '#FF5252',
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '4px',
  },
};
