import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(product)} className="add-to-cart-button">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;