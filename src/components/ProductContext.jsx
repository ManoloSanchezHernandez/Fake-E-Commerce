import React, { createContext, useState } from 'react';

// Crear el contexto
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]); // Estado para almacenar productos

    // Función para eliminar un producto por ID
    const deleteProductById = (id) => {
        // Filtrar el producto a eliminar (usando el ID)
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);

        // Si estás utilizando localStorage, también puedes actualizarlo aquí
        localStorage.setItem('localProducts', JSON.stringify(updatedProducts));
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, deleteProductById }}>
            {children}
        </ProductContext.Provider>
    );
};
