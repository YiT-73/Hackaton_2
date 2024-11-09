import { useState, useCallback } from 'react';

interface Product {
  itemId: string;
  title: string;
  price: number;
  imgUrl: string;
  stars: number;
  isBestSeller: boolean;
  boughtInLastMonth: number;
}

interface ProductsResponse {
  items: Product[];
  lastKey: string | null;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMoreProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const API_BASE_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';
const ITEMS_PER_PAGE = 10;

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (key: string | null = null) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        limit: ITEMS_PER_PAGE.toString(),
        ...(key && { lastKey: key }),
      });

      const response = await fetch(`${API_BASE_URL}/items?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsResponse = await response.json();
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    const data = await fetchProducts(lastKey);
    
    if (data) {
      setProducts(prev => [...prev, ...data.items]);
      setLastKey(data.lastKey);
      setHasMore(!!data.lastKey);
    }
  }, [loading, hasMore, lastKey]);

  const refreshProducts = useCallback(async () => {
    setProducts([]);
    setLastKey(null);
    setHasMore(true);
    
    const data = await fetchProducts(null);
    
    if (data) {
      setProducts(data.items);
      setLastKey(data.lastKey);
      setHasMore(!!data.lastKey);
    }
  }, []);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMoreProducts,
    refreshProducts,
  };
};