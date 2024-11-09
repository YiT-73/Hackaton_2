import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onClick,
}) => {
  return (
    <Card 
      className="h-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <img
            src={product.imgUrl || "/api/placeholder/400/400"}
            alt={product.title}
            className="object-cover w-full h-full"
          />
          {product.isBestSeller && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.boughtInLastMonth} compras este mes
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.itemId);
              }}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};