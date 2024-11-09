import { addItemToCart as apiAddItemToCart, removeItemFromCart as apiRemoveItemFromCart, getUserCart as apiGetUserCart, purchaseCart as apiPurchaseCart } from './api';

export const addItemToCart = async (itemId: string, userId: string, token: string) => {
  try {
    const response = await apiAddItemToCart(itemId, userId, token);
    return response;
  } catch (error) {
    console.error('Error al añadir el producto al carrito:', error);
    throw error;
  }
};

export const removeItemFromCart = async (itemId: string, userId: string, token: string) => {
  try {
    const response = await apiRemoveItemFromCart(itemId, userId, token);
    return response;
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    throw error;
  }
};

export const getUserCart = async (userId: string, token: string) => {
  try {
    const response = await apiGetUserCart(userId, token);
    return response;
  } catch (error) {
    console.error('Error al obtener el carrito del usuario:', error);
    throw error;
  }
};

export const purchaseCart = async (userId: string, token: string) => {
  try {
    const response = await apiPurchaseCart(userId, token);
    return response;
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    throw error;
  }
};
