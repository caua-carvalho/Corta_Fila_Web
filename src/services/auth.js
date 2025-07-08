import axios from 'axios';

// Carrega a URL base da API a partir da variável de ambiente
const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
  throw new Error('A variável de ambiente VITE_API_BASE_URL não está definida. Verifique seu arquivo .env.');
}
/** * Registra um barbeiro na API.
 * @param {string} name - Nome do barbeiro.
 * @param {string} bio - Biografia do barbeiro.
 * @param {File} photo - Foto do barbeiro.
 * @param {string} email - Email do barbeiro.
 * @returns {Promise<Object>} Dados do barbeiro registrado.
 */
export async function infoBarber() {
  const user = JSON.parse(localStorage.getItem('authBarber'));
  if (!user) return null;

  const response = await axios.get(`${API_BASE_URL}/barbers/info.php`, {
    params: { user_id: user.user_id },
  });

  return response.data;
}

export async function loginBarber(phone, password) {
  const response = await axios.post(`${API_BASE_URL}/user/login.php`, {
    phone,
    password,
  });

  const user = response.data.user ?? response.data;
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
}

export async function registerBarber(name, phone, password) {
  const response = await axios.post(`${API_BASE_URL}/user/register.php`, {
    name,
    phone,
    password,
  });

  console.log(response);

  const user = response.data.user ?? response.data;
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem('authUser');
  window.location.reload(true);
}

export function getCurrentUser() {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
}

export function isBarberAuthenticated() {
  const user = getCurrentUser();
  return !!user && user.role === 0;
}
