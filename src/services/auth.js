import axios from 'axios';

// A URL base pode ser configurada via arquivo .env
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    'http://localhost:8080/Corta_Fila/back-end/public',
  withCredentials: true,
});

// Chama o endpoint de login; o backend deve gravar um cookie HTTP-only
export async function login(phone, password) {
  const { data } = await api.post('/login.php', { phone, password });
  return data; // { authorized: true }
}

// Chama o endpoint de logout para remover o cookie
export async function logout() {
  await api.post('/logout.php');
}

// Valida a sessão existente através do cookie
export async function validate() {
  const { data } = await api.get('/validate.php');
  return data; // { authorized: true, user: { ... } }
}

export default api;

