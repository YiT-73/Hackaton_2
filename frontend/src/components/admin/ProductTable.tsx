import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductTableProps {
    products: Product[];
    onDeleteProduct: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDeleteProduct }) => {
    return (
        <table className="product-table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} />
                        </td>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                            <button onClick={() => onDeleteProduct(product.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;