import { useState, useCallback, useEffect } from 'react';
import type { CartItem, Cart, Product, AddToCartRequest } from '../types';
import { useAuth } from './useAuth';

interface UseCartReturn {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, qty: number) => Promise<void>;
  clearCart: () => void;
  getCartTotal: () => number;
  fetchCart: () => Promise<void>;
}

const API_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';

export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  // Fetch cart from API
  const fetchCart = useCallback(async (): Promise<void> => {
    if (!user || !token) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/cart/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data: Cart = await response.json();
      setItems(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setIsLoading(false);
    }
  }, [user, token]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId: string): Promise<void> => {
    if (!user || !token) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Optimistically update UI
      setItems(items.filter(item => item.itemId !== itemId));

      // We can simulate removal by setting quantity to 0
      // or not sending the item in the next update
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, token, items, fetchCart]);

  // Add item to cart
  const addToCart = useCallback(async (product: Product): Promise<void> => {
    if (!user || !token) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload: AddToCartRequest = {
      itemId: product.itemId,
      userId: user.userId,
    };

    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      // Refresh cart after adding item
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, token, fetchCart]);

  // Update item quantity
  const updateQuantity = useCallback(async (itemId: string, qty: number): Promise<void> => {
    if (!user || !token) {
      setError('User not authenticated');
      return;
    }

    if (qty < 1) {
      await removeFromCart(itemId);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Optimistically update the UI
      setItems(items.map(item => 
        item.itemId === itemId ? { ...item, qty } : item
      ));

      // Send the update to the server
      const payload: AddToCartRequest = {
        itemId,
        userId: user.userId,
      };

      const response = await fetch(`${API_URL}/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      // Refresh cart to ensure sync with server
      await fetchCart();
    } catch (err) {
      // Revert optimistic update on error
      setError(err instanceof Error ? err.message : 'Failed to update cart');
      await fetchCart();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, token, items, fetchCart, removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback((): void => {
    setItems([]);
  }, []);

  // Calculate cart total
  const getCartTotal = useCallback((): number => {
    return items.reduce((total, item) => total + (item.qty), 0);
  }, [items]);

  // Fetch cart on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // Clear cart when user logs out
      setItems([]);
    }
  }, [user, fetchCart]);

  return {
    items,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    fetchCart,
  };
};