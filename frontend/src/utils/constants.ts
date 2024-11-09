export const ERROR_MESSAGES = {
    PRODUCT_NOT_FOUND: 'El producto no fue encontrado.',
    OUT_OF_STOCK: 'Este producto está agotado.',
    CART_EMPTY: 'El carrito está vacío.',
};

// Tipos de acción para Redux (si usas Redux)
export const ActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    INCREASE_QUANTITY: 'INCREASE_QUANTITY',
    DECREASE_QUANTITY: 'DECREASE_QUANTITY',
};

// Configuraciones generales
export const APP_CONFIG = {
    API_URL: 'https://api.example.com',
    MAX_CART_ITEMS: 10,
};

// Categorías de productos
export const PRODUCT_CATEGORIES = [
    'Electrónica',
    'Ropa',
    'Hogar',
    'Juguetes',
    'Libros',
];

// Otros mensajes
export const MESSAGES = {
    SUCCESS_ADD_TO_CART: 'Producto añadido al carrito exitosamente.',
    SUCCESS_REMOVE_FROM_CART: 'Producto eliminado del carrito.',
};