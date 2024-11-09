export interface Product {
    itemId: string;
    title: string;
    price: number;
    imgUrl: string;
    stars: number;
    isBestSeller: boolean;
    boughtInLastMonth: number;
  }
  
  // services/productService.ts
  export const fetchProducts = async (limit: number = 10, lastKey?: string): Promise<{
    items: Product[];
    lastKey?: string;
  }> => {
    let url = `https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/items?limit=${limit}`;
    if (lastKey) {
      url += `&lastKey=${lastKey}`;
    }
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar los productos');
    }
    return response.json();
  };
  
  export const fetchProductById = async (id: string): Promise<Product> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No autorizado');
    }
  
    const response = await fetch(
      `https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/item/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
  
    if (!response.ok) {
      throw new Error('Error al cargar el producto');
    }
    return response.json();
  };
  