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
  const user = JSON.parse(sessionStorage.getItem('authBarber'));
  if (!user) return null;

  const token = sessionStorage.getItem('authToken');
  const response = await axios.get(`${API_BASE_URL}/barbers/info.php`, {
    params: { user_id: user.user_id },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return response.data;
}

export async function loginBarber(phone, password) {
  const response = await axios.post(`${API_BASE_URL}/user/login.php`, {
    phone,
    password,
  });

  const { token, user } = response.data;
  if (token) {
    sessionStorage.setItem('authToken', token);
  }
  const userInfo = user ?? response.data.user ?? response.data;
  sessionStorage.setItem('authUser', JSON.stringify(userInfo));
  return userInfo;
}

export async function registerBarber(name, phone, password) {
  const response = await axios.post(`${API_BASE_URL}/user/register.php`, {
    name,
    phone,
    password,
  });

  console.log(response);

  const { token, user } = response.data;
  if (token) {
    sessionStorage.setItem('authToken', token);
  }
  const userInfo = user ?? response.data.user ?? response.data;
  sessionStorage.setItem('authUser', JSON.stringify(userInfo));
  return userInfo;
}

export function logout() {
  sessionStorage.removeItem('authUser');
  sessionStorage.removeItem('authToken');
  window.location.reload(true);
}

export function getCurrentUser() {
  const user = sessionStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
}

export function isBarberAuthenticated() {
  const user = getCurrentUser();
  return !!user && user.role === 0;
}
