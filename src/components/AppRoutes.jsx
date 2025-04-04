import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Products from './pages/Products';
import Add from './pages/Add';
import Search from './pages/Search';
import Categories from './pages/Categories';
import HomePage from './home/HomePage';
import Comments from './pages/Comments';

import Detalles from './pages/Detalles';
import { ProductProvider } from './ProductContext';
export default function AppRoutes() {
    return (
        <ProductProvider>
            <Routes>
            {/* La ruta "/" ahora está dirigida al Dashi, que es el layout general */}
            <Route path="/" element={<HomePage />}/>
                <Route path="products" element={<Products />} />
                <Route path="search" element={<Search />} />
                <Route path="add" element={<Add />} />
                <Route path="categories" element={<Categories />} />
                <Route path="products/:id" element={<Detalles />} />
                <Route path='comentarios' element={<Comments />} />
                {/* Ruta comodín para páginas no encontradas */}
                <Route path="*" element={<NotFound />} />
            
        </Routes>
        </ProductProvider>
    );
}
