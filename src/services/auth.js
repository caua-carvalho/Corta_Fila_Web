import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/Corta_Fila_Back';

export async function loginBarber(phone, password) {
  const response = await axios.post(`${API_BASE_URL}/barbers/login.php`, {
    phone,
    password,
  });

  const user = response.data.user ?? response.data;
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
}

export async function registerBarber(name, phone, password) {
  const response = await axios.post(`${API_BASE_URL}/barbers/register.php`, {
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
}

export function getCurrentUser() {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
}

export function isBarberAuthenticated() {
  const user = getCurrentUser();
  return !!user && user.role === 1;
}
