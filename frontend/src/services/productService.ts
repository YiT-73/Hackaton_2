import axios from 'axios';
import { Product } from '../types/product';

const API_BASE_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';

// Helper function to get the auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper to set auth header
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Producto no encontrado');
    }
    throw new Error('Error al cargar el producto');
  }
};

// Fetch products with pagination
export const fetchProducts = async (limit: number, lastKey?: string): Promise<{
  items: Product[];
  lastKey: string | null;
}> => {
  try {
    const url = new URL(`${API_BASE_URL}/items`);
    url.searchParams.append('limit', limit.toString());
    if (lastKey) {
      url.searchParams.append('lastKey', lastKey);
    }

    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    throw new Error('Error al cargar los productos');
  }
};

// Create a new product (admin only)
export const createProduct = async (product: Omit<Product, 'itemId'>): Promise<{ itemId: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/item`, product, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error('No autorizado para crear productos');
    }
    throw new Error('Error al crear el producto');
  }
};

// Update a product (admin only)
export const updateProduct = async (product: Product): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/item`, product, {
      headers: getAuthHeaders(),
    });
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error('No autorizado para actualizar este producto');
    }
    if (error.response?.status === 404) {
      throw new Error('Producto no encontrado');
    }
    throw new Error('Error al actualizar el producto');
  }
};

// Delete a product (admin only)
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/item/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error('No autorizado para eliminar este producto');
    }
    if (error.response?.status === 404) {
      throw new Error('Producto no encontrado');
    }
    throw new Error('Error al eliminar el producto');
  }
};