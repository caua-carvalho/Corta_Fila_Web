// Gerado pelo Copilot

import { useState } from 'react';
import axios from 'axios';
import {getCurrentUser } from '../../services/auth.js';

// Função principal que renderiza o formulário de cadastro de barbeiro
function BarberForm({ userId }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState(null);

    // Atualiza o estado da foto selecionada
    function handlePhotoChange(event) {
        setPhoto(event.target.files[0]);
    }

    // Monta o FormData com os dados do barbeiro
    function createBarberFormData({ name, email, bio, userId, photo }) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('bio', bio);
        formData.append('user_id', userId);
        if (photo) formData.append('photo', photo);
        return formData;
    }

    // Envia os dados para a API usando axios
    async function submitBarberData(formData) {
        try {
            const response = await axios.post(
                'http://localhost:8080/Corta_Fila_Back/barber/register/register.php',
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

        // Aqui passamos userId como chave, para evitar erro de sintaxe
        const formData = createBarberFormData({ name, email, bio, userId: user.user_id, photo });

        try {
            const result = await submitBarberData(formData);
            if (result.success) {
                alert('Barbeiro cadastrado!');
                localStorage.setItem('authBarber', JSON.stringify(result.user));
            } else {
                console.log(result);
                alert('Erro: ' + result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nome"
                required
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Bio"
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                required
            />
            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default BarberForm;
