import React, { useState } from 'react';

const API = process.env.REACT_APP_API_BASE_URL;

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const url = isRegister ? '/register' : '/login';
    const payload = isRegister ? { name, phone, password } : { phone, password };

    fetch(`${API}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage('Sucesso!');
        } else {
          setMessage(data.error || 'Erro');
        }
      })
      .catch(() => setMessage('Erro'));
  };

  return (
    <div style={{ padding: '1rem', color: 'var(--primary-color)' }}>
      <h2>{isRegister ? 'Cadastro' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <input
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <input
            placeholder="Telefone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ background: 'var(--secondary-color)', color: '#fff', border: 0, padding: '0.5rem', marginTop: '0.5rem' }}>Enviar</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)} style={{ marginTop: '1rem', background: 'var(--secondary-color)', color: '#fff', border: 0, padding: '0.5rem' }}>
        {isRegister ? 'Já tenho conta' : 'Quero me cadastrar'}
      </button>
      <div>{message}</div>
    </div>
  );
}

export default LoginPage;
