import React, { useState } from 'react';

interface ProductFormProps {
    onAddProduct: (product: { name: string; price: number; imageUrl: string; description: string }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>(''); // Puedes cambiar esto a 0 si prefieres
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && price && imageUrl && description) {
            onAddProduct({ name, price: Number(price), imageUrl, description });
            // Reiniciar el formulario
            setName('');
            setPrice('');
            setImageUrl('');
            setDescription('');
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <label htmlFor="name">Nombre del producto:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="price">Precio:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPrice(value ? Number(value) : ''); // Convierte a número o establece como cadena vacía
                    }}
                    required
                />
            </div>
            <div>
                <label htmlFor="imageUrl">URL de la imagen:</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default ProductForm;