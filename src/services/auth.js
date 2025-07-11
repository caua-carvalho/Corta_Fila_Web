import axios from 'axios';

// Carrega a URL base da API a partir da variável de ambiente
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

if (!REACT_APP_API_URL) {
  throw new Error('A variável de ambiente VITE_REACT_APP_API_URL não está definida. Verifique seu arquivo .env.');
}

export async function loginBarber(phone, password) {
  const response = await axios.post(
    `${REACT_APP_API_URL}/user/login.php`,
    { phone, password },
    { withCredentials: true } // 🔑 envia e recebe cookies
  );

  return response.data.status; // apenas 'mensagem', o token está no cookie HttpOnly
}


export async function registerBarber(name, phone, password) {
  const response = await axios.post(
    `${REACT_APP_API_URL}/user/register.php`,
    { name, phone, password },
    { withCredentials: true }
  );

  return response.data;
}

export function logout() {
  localStorage.removeItem('authUser');
  window.location.reload(true);
}
