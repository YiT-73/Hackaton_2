import React from 'react';

// Definición de la interfaz para el producto
export interface Product {
    id: number;
    name: string;
    price: number;
}

// Definición de las propiedades del componente CartItem
interface CartItemProps {
    product: Product;
    quantity: number;
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
    onRemove: (productId: number) => void;
}

// Componente CartItem
const CartItem: React.FC<CartItemProps> = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="cart-item">
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <p>Cantidad: {quantity}</p>
            <div className="cart-item-actions">
                <button onClick={() => onDecrease(product.id)} disabled={quantity === 1}>-</button>
                <button onClick={() => onIncrease(product.id)}>+</button>
                <button onClick={() => onRemove(product.id)}>Eliminar</button>
            </div>
        </div>
    );
};

export default CartItem;
