import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/Corta_Fila_Back/public',
});

// Módulo auth encapsulado
const auth = {
  // --- Token management ---
  setToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  },

  init() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // --- Login namespace ---
  login: {
    async execute(phone, password) {
      const { data } = await api.post('/login.php', { phone, password });
      auth.setToken(data.token);
      return data;
    },

    async validate() {
      const { data } = await api.get('/validate.php');
      return data; // { authorized, user: { ... } }
    },
  },

  // --- Register namespace ---
  register: {
    async execute({ name, phone, email, password }) {
      const payload = { name, phone, email, password };
      const { data } = await api.post('/register.php', payload);
      return data;
    },
  },

  // --- Logout direto no root ---
  logout() {
    auth.setToken(null);
  },
  
};

export default auth;
