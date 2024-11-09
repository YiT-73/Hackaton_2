import React from 'react';
import { Product } from './CartItem'; 


interface CartSummaryProps {
    items: { product: Product; quantity: number }[];
}

// Componente CartSummary
const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
    const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="cart-summary">
            <h2>Resumen del Carrito</h2>
            {items.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.product.name} - Cantidad: {item.quantity} - Precio: ${item.product.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                </>
            )}
        </div>
    );
};

export default CartSummary;