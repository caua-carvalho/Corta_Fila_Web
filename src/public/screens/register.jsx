import React, { useState } from 'react';
import FloatingInput from '../components/FloatingInput.css/FloatingInput.jsx'; // Certifique-se de que o caminho está correto
import { registerBarber } from '../../services/auth.js'; // Ajuste o caminho conforme necessário
import '../../styles/screens.css';

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
    
    // Função para lidar com sucesso no cadastro
    // Gerado pelo Copilot
    const handleCadastroSucesso = () => {
      // Aqui seria melhor redirecionar o usuário, por exemplo:
      window.location.href = '/login';
    };

    registerBarber(form.nome, form.telefone, form.senha)
      .then(handleCadastroSucesso)
      .catch(err => {
        console.error('Erro ao cadastrar:', err);
        setErro('Erro ao cadastrar. Tente novamente.');
      });
  };

  return (
    <div className="screen-container">
      <div className="screen-card">
        <h1 className="screen-title">REGISTRE-SE</h1>
        <form onSubmit={handleSubmit} className="screen-form">
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

        {erro && <span className="screen-error">{erro}</span>}

          <button type="submit" className="screen-button">
            CADASTRAR
          </button>
        </form>
        <p className="screen-footer-link">
          Já tem uma conta?{' '}
          <a href="/login" className="screen-link-anchor">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}

