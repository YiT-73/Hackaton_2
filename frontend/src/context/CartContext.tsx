import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as api from '../services/api';

// Types
interface CartItem {
  itemId: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

interface CartContextType extends CartState {
  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, qty: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  clearCart: () => void;
  purchaseCart: () => Promise<void>;
}

type CartAction =
  | { type: 'SET_CART_ITEMS'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, token, isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !user?.username || !token) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.getUserCart(user.username, token);
      dispatch({ type: 'SET_CART_ITEMS', payload: response.products });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error fetching cart',
      });
    }
  }, [isAuthenticated, user, token]);

  const addToCart = useCallback(async (itemId: string) => {
    if (!isAuthenticated || !user?.username || !token) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Must be logged in to add items to cart',
      });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await api.addItemToCart(itemId, user.username, token);
      await fetchCart();
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error adding item to cart',
      });
    }
  }, [isAuthenticated, user, token, fetchCart]);

  const removeFromCart = useCallback(async (itemId: string) => {
    if (!isAuthenticated || !user?.username || !token) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await api.removeItemFromCart(itemId, user.username, token);
      await fetchCart();
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error removing item from cart',
      });
    }
  }, [isAuthenticated, user, token, fetchCart]);

  const updateQuantity = useCallback(async (itemId: string, qty: number) => {
    if (!isAuthenticated || !user?.username || !token) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Since your API doesn't have a direct updateQuantity endpoint,
      // we'll remove and add the item again with the new quantity
      await api.removeItemFromCart(itemId, user.username, token);
      if (qty > 0) {
        await api.addItemToCart(itemId, user.username, token);
      }
      await fetchCart();
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error updating quantity',
      });
    }
  }, [isAuthenticated, user, token, fetchCart]);

  const purchaseCart = useCallback(async () => {
    if (!isAuthenticated || !user?.username || !token) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await api.purchaseCart(user.username, token);
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error processing purchase',
      });
    }
  }, [isAuthenticated, user, token]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // Fetch cart on auth state change
  React.useEffect(() => {
    if (isAuthenticated && user?.username && token) {
      fetchCart();
    } else {
      clearCart();
    }
  }, [isAuthenticated, user, token, fetchCart, clearCart]);

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCart,
    clearCart,
    purchaseCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}