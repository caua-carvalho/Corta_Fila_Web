// Gerado pelo Copilot

import React, { useState } from 'react';
import axios from 'axios';
import FloatingInput from '../../public/components/FloatingInput.css/FloatingInput.jsx';
import { getCurrentUser } from '../../services/auth.js';
import '../../styles/screens.css';

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
        sessionStorage.setItem('authBarber', JSON.stringify(result.user));
        window.location.href = '/barber';
      } else {
        setError(result.message || 'Erro ao cadastrar');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="screen-container">
      <div className="screen-card">
        <h1 className="screen-title">CADASTRAR BARBEIRO</h1>
        <form onSubmit={handleSubmit} className="screen-form" encType="multipart/form-data">
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
            className="screen-textarea"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="screen-file-input"
            required
          />
          {error && <span className="screen-error">{error}</span>}
          <button type="submit" className="screen-button">
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default BarberRegister;


