// Add.jsx
import React, { useState, useEffect, useContext } from "react";
import { Button, TextField, Grid, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext";

export default function Add() {
    const { setProducts } = useContext(ProductContext); // Usar el Context
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [categories, setCategories] = useState([]);

    // Cargar categorías de la API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products/categories");
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    
      // Validación de campos
      if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.category || !newProduct.image) {
          alert("Por favor, completa todos los campos.");
          return;
      }
    
      // Crear nuevo producto con ID único
      const productData = {
          id: Date.now(),  // ID temporal
          ...newProduct,
          price: parseFloat(newProduct.price),
          rating: { rate: 0, count: 0 }  // Agregar rating por consistencia con la API
      };
    
      // Obtener productos existentes de localStorage
      const existingProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
    
      // Verificar si el producto ya existe (evitar duplicados)
      const productExists = existingProducts.some(product => product.id === productData.id);
      if (productExists) {
          alert("Este producto ya existe.");
          return;
      }
    
      // Agregar el nuevo producto
      const updatedProducts = [...existingProducts, productData];
      localStorage.setItem('localProducts', JSON.stringify(updatedProducts));
    
      // Actualizar estado global de productos
      setProducts(prevProducts => {
          // Verificar si el producto ya está en el estado (evitar duplicados)
          const isProductInState = prevProducts.some(product => product.id === productData.id);
          if (isProductInState) {
              return prevProducts; // No hacer nada si ya existe
          }
          return [...prevProducts, productData]; // Agregar el nuevo producto
      });
    
      // Reiniciar formulario y mostrar diálogo
      setNewProduct({ title: "", price: "", description: "", category: "", image: "" });
      setOpenDialog(true);
    };
    

    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Agregar Nuevo Producto
            </Typography>

            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Título"
                                name="title"
                                value={newProduct.title}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Precio"
                                name="price"
                                type="number"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Descripción"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                select
                                label="Categoría"
                                name="category"
                                value={newProduct.category}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                SelectProps={{ native: true }}
                                sx={{ mb: 2 }}
                            >
                                <option value="">Seleccione una categoría</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </TextField>
                            <TextField
                                label="URL de Imagen"
                                name="image"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                            />

                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth
                                size="large"
                                sx={{ borderRadius: 2, py: 1.5 }}
                            >
                                Agregar Producto
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>¡Producto Agregado!</DialogTitle>
                <DialogContent>
                    <Typography>El producto se ha agregado correctamente.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        component={Link} 
                        to="/products" 
                        color="primary"
                        onClick={handleCloseDialog}
                    >
                        Ver Productos
                    </Button>
                    <Button onClick={handleCloseDialog}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}