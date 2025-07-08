// Gerado pelo Copilot

import React, { useState } from 'react';
import axios from 'axios';
import FloatingInput from '../../public/components/FloatingInput.css/FloatingInput.jsx';
import { getCurrentUser } from '../../services/auth.js';

// Função principal que renderiza o formulário de cadastro de barbeiro
function BarberRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    photo: null,
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handlePhotoChange(e) {
    setForm(prev => ({ ...prev, photo: e.target.files[0] }));
  }

    // Monta o FormData com os dados do barbeiro
  function createBarberFormData(userId) {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('bio', form.bio);
    formData.append('user_id', userId);
    if (form.photo) formData.append('photo', form.photo);
    return formData;
  }

    // Envia os dados para a API usando axios
  async function submitBarberData(formData) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/barber/register/register.php`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro de rede');
    }
  }

    // Lida com o envio do formulário
  async function handleSubmit(event) {
    event.preventDefault();
    const user = getCurrentUser();
    const formData = createBarberFormData(user.user_id);

    try {
      const result = await submitBarberData(formData);
      if (result.success) {
        localStorage.setItem('authBarber', JSON.stringify(result.user));
        window.location.href = '/barber';
      } else {
        setError(result.message || 'Erro ao cadastrar');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>CADASTRAR BARBEIRO</h1>
        <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
          <FloatingInput
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            style={styles.textarea}
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={styles.fileInput}
            required
          />
          {error && <span style={styles.error}>{error}</span>}
          <button type="submit" style={styles.button}>
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default BarberRegister;

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
  textarea: {
    width: '100%',
    padding: '8px',
    background: 'transparent',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
    resize: 'vertical',
    minHeight: '80px',
  },
  fileInput: {
    marginTop: '12px',
    color: '#fff',
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
  },
};
