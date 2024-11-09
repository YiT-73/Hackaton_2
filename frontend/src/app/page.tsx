import React, { useState } from 'react';
import CartItem, { Product } from '../components/cart/CartItem'; // Ensure the path is correct
import CartSummary from '../components/cart/CartSummary'; // Ensure the path is correct

const Page: React.FC = () => {
    // Estado para los productos en el carrito
    const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([
        { product: { id: 1, name: 'Producto 1', price: 10 }, quantity: 2 },
        { product: { id: 2, name: 'Producto 2', price: 15 }, quantity: 1 },
    ]);

    // Función para aumentar la cantidad de un producto
    const handleIncrease = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Función para disminuir la cantidad de un producto
    const handleDecrease = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Función para eliminar un producto del carrito
    const handleRemove = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    };

    return (
        <div className="app">
            <h1>Carrito de Compras</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.product.id}
                        product={item.product}
                        quantity={item.quantity}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onRemove={handleRemove}
                    />
                ))}
            </div>
            <CartSummary items={cartItems} />
        </div>
    );
};

export default Page;