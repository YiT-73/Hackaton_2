export const calculateCartTotal = (cartItems: { product: { price: number }; quantity: number }[]): number => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

// Función para formatear precios
export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`; // Formato de precio en dólares
};

// Función para validar un producto
export const isProductInStock = (product: { stock: number }): boolean => {
    return product.stock > 0;
};

// Función para encontrar un producto por ID
export const findProductById = (products: { id: number }[], productId: number) => {
    return products.find(product => product.id === productId);
};

// Función para generar un ID único (ejemplo simple)
export const generateUniqueId = (): string => {
    return '_' + Math.random().toString(36).substr(2, 9);
};