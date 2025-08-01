import axios from 'axios';

// Carrega a URL base da API a partir da variável de ambiente
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

if (!REACT_APP_API_URL) {
  throw new Error('A variável de ambiente REACT_APP_VIT_BASE_URL não está definida. Verifique seu arquivo .env.');
}

export async function loginBarber(phone, password) {
  const response = await axios.post(
    `${REACT_APP_API_URL}/user/login.php`,
    { phone, password },
    { withCredentials: true } // 🔑 envia e recebe cookies
  );

  const { token, user } = response.data;
  if (token) {
    sessionStorage.setItem('authToken', token);
  }
  const userInfo = user ?? response.data.user ?? response.data;
  sessionStorage.setItem('authUser', JSON.stringify(userInfo));
  return userInfo;
}


export async function registerBarber(name, phone, password) {
  const response = await axios.post(
    `${REACT_APP_API_URL}/user/register.php`,
    { name, phone, password },
    { withCredentials: true }
  );

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
