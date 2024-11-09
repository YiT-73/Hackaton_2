import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { fetchProducts } from '../../services/productService';
import { Product } from '../../types/product';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastKey, setLastKey] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver>();
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProducts(12);
      setProducts(response.items);
      setLastKey(response.lastKey);
      setHasMore(!!response.lastKey);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!lastKey || loading) return;
    
    try {
      setLoading(true);
      const response = await fetchProducts(12, lastKey);
      setProducts(prev => [...prev, ...response.items]);
      setLastKey(response.lastKey);
      setHasMore(!!response.lastKey);
    } catch (err) {
      setError('Error al cargar más productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
        <button
          onClick={loadProducts}
          className="block mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.itemId}
            ref={index === products.length - 1 ? lastProductRef : undefined}
          >
            <ProductCard
              product={product}
              onClick={() => navigate(`/product/${product.itemId}`)}
              onAddToCart={(id) => {
                // Implementar lógica de agregar al carrito
                console.log('Agregar al carrito:', id);
              }}
            />
          </div>
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}
    </div>
  );
};
