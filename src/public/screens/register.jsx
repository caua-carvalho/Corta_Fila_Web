import React, { useState } from 'react';
import FloatingInput from '../components/FloatingInput.css/FloatingInput.jsx'; // Certifique-se de que o caminho está correto

export default function Register() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    senha: '',
    confirmacaoSenha: '',
  });
  const [erro, setErro] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    if (!form.nome.trim()) return 'Nome é obrigatório.';
    if (!form.telefone.trim()) return 'Telefone é obrigatório.';
    if (form.senha.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    if (form.senha !== form.confirmacaoSenha) return 'As senhas não coincidem.';
    return '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    const msg = validar();
    if (msg) {
      setErro(msg);
      return;
    }
    setErro('');
    // chame sua API aqui
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>AGENDA</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <FloatingInput
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />
        <FloatingInput
          label="Telefone"
          name="telefone"
          type="tel"
          value={form.telefone}
          onChange={handleChange}
        />
        <FloatingInput
          label="Senha"
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
        />
        <FloatingInput
          label="Confirmação de Senha"
          name="confirmacaoSenha"
          type="password"
          value={form.confirmacaoSenha}
          onChange={handleChange}
        />

        {erro && <span style={styles.error}>{erro}</span>}

          <button type="submit" style={styles.button}>
            CADASTRAR
          </button>
        </form>
        <p style={styles.footerLink}>
          Já tem uma conta?{' '}
          <a href="/login" style={styles.linkAnchor}>
            Entrar
          </a>
        </p>
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
  footerLink: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#AAA',
  },
  linkAnchor: {
    color: '#C38A42',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
