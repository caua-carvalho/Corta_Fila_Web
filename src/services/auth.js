import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/Corta_Fila_Back/public';

export async function loginBarber(telefone, senha) {
  const response = await axios.post(`${API_BASE_URL}/barbeiros/login`, {
    telefone,
    senha,
  });

  const user = response.data.user ?? response.data;
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
}

export async function registerBarber(nome, telefone, senha) {
  const response = await axios.post(`${API_BASE_URL}/barbeiros/register`, {
    nome,
    telefone,
    senha,
  });

  const user = response.data.user ?? response.data;
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem('authUser');
}

export function getCurrentUser() {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
}

export function isBarberAuthenticated() {
  const user = getCurrentUser();
  return !!user && user.role === 'barbeiro';
}
