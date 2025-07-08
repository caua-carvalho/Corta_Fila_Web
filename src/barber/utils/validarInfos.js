import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export async function registerBarberShop(name, bio, photo, email) {
  const response = await axios.post(`${API_BASE_URL}/barbers/register.php`, {
    name,
    bio,
    photo,
    email,
    user_id: JSON.parse(localStorage.getItem('authUser')).user_id,
  });

  const user = response.data.user ?? response.data;
  localStorage.setItem('authBarber', JSON.stringify(user));
  return user;
}