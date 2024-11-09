import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com'; // Reemplaza con la URL de tu API

interface LoginResponse {
  token: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw new Error('Inicio de sesión fallido');
  }
};