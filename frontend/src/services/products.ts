interface Product {
    id: number;
    name: string;
    price: number;
}

// Clase para manejar la gestión de productos
class ProductManager {
    private products: Product[] = [];
    private nextId: number = 1; // Para asignar IDs únicos a los productos

    // Método para agregar un producto
    addProduct(name: string, price: number): Product {
        const newProduct: Product = { id: this.nextId++, name, price };
        this.products.push(newProduct);
        return newProduct;
    }

    // Método para eliminar un producto por ID
    removeProduct(productId: number): boolean {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== productId);
        return this.products.length < initialLength; // Retorna true si se eliminó un producto
    }

    // Método para listar todos los productos
    listProducts(): void {
        console.log("Lista de productos:");
        this.products.forEach(product => {
            console.log(`ID: ${product.id} - Nombre: ${product.name} - Precio: $${product.price}`);
        });
    }

    // Método para buscar un producto por ID
    findProduct(productId: number): Product | undefined {
        return this.products.find(product => product.id === productId);
    }
}

// Ejemplo de uso
const productManager = new ProductManager();

// Agregar productos
productManager.addProduct("Camiseta", 20);
productManager.addProduct("Pantalones", 30);
productManager.addProduct("Zapatos", 50);

// Listar productos
productManager.listProducts();

// Buscar un producto
const foundProduct = productManager.findProduct(2);
if (foundProduct) {
    console.log(`Producto encontrado: ${foundProduct.name} - Precio: $${foundProduct.price}`);
}

// Eliminar un producto
const isRemoved = productManager.removeProduct(1);
console.log(isRemoved ? "Producto eliminado" : "Producto no encontrado");

// Listar productos después de la eliminación
productManager.listProducts();