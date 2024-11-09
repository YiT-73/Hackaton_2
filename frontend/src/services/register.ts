import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com'; // Reemplaza con la URL de tu API

interface RegisterResponse {
  message: string;
}

export const register = async (username: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw new Error('Registro fallido');
  }
};