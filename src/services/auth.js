import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/Corta_Fila/back-end/public',
});

// Define ou remove o header Authorization e atualiza localStorage
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

// Chama o endpoint de login, seta token e retorna dados
export async function login(phone, password) {
  const { data } = await api.post('/login.php', { phone, password });
  setAuthToken(data.token);
  return data;
}

// Remove token e header
export function logout() {
  setAuthToken(null);
}

// Na inicialização da app, lê localStorage e seta header
export function initAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export async function validate() {
  const { data } = await api.get('/validate.php');
  return data;               // authorized, user: { ... }
}

