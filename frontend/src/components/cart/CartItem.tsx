import React from 'react';

// Definición del tipo Product
export interface Product {
    id: number;
    name: string;
    price: number;
}

// Props del componente CartItem
interface CartItemProps {
    product: Product;
    quantity: number;
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
    onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="cart-item">
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Cantidad: {quantity}</p>
            <button onClick={() => onIncrease(product.id)}>+</button>
            <button onClick={() => onDecrease(product.id)}>-</button>
            <button onClick={() => onRemove(product.id)}>Eliminar</button>
        </div>
    );
};

export default CartItem;