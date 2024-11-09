import axios from 'axios';

const API_BASE_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const register = async (username: string, password: string, role: string) => {
  try {
    const response = await api.post('/auth/register', { username, password, role });
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

export const getUserRole = async (token: string) => {
  setAuthToken(token);
  try {
    const response = await api.get('/auth');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el rol del usuario:', error);
    throw error;
  }
};

export const createItem = async (item: any, token: string) => {
  setAuthToken(token);
  try {
    const response = await api.post('/item', item);
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

export const updateItem = async (id: string, item: any, token: string) => {
  setAuthToken(token);
  try {
    const response = await api.put(`/item/${id}`, item);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

export const deleteItem = async (id: string, token: string) => {
  setAuthToken(token);
  try {
    const response = await api.delete(`/item/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

export const getItem = async (id: string) => {
  try {
    const response = await api.get(`/item/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
};

export const getItems = async (limit: number, lastKey?: string) => {
  try {
    const response = await api.get('/items', {
      params: { limit, lastKey },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

export const addItemToCart = async (itemId: string, userId: string, token: string) => {
  setAuthToken(token);
  try {
    const response = await api.post('/cart', { itemId, userId });
    return response.data;
  } catch (error) {
    console.error('Error al añadir el producto al carrito:', error);
    throw error;
  }
};

export const removeItemFromCart = async (itemId: string, userId: string, token: string) => {
  setAuthToken(token);
  try {
    const response = await api.delete('/cart', { data: { itemId, userId } });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    throw error;
  }
};

export const getUserCart = async (userId: string, token: string) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito del usuario:', error);
    throw error;
  }
};

export const purchaseCart = async (userId: string, token: string) => {
  setAuthToken(token);
  try {
    const response = await api.post('/buy', { userId });
    return response.data;
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    throw error;
  }
};
