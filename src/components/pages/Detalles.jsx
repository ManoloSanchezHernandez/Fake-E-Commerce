import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Typography, Paper, Button, CircularProgress, Grid, Box, Modal, TextField } from "@mui/material";
import { ProductContext } from "../ProductContext"; // Importar el Context

export default function Detalles() {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const { products, deleteProductById } = useContext(ProductContext); // Obtener los productos y la función de eliminación del Context
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ratingModalOpen, setRatingModalOpen] = useState(false); // Estado para abrir/cerrar el modal de calificación
    const [ratingValue, setRatingValue] = useState(0); // Valor de la calificación
    const navigate = useNavigate(); // Hook de navegación para redirigir después de eliminar

    // Buscar el producto por su ID
    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setLoading(false);
        } else {
            setProduct(null);
            setLoading(false);
        }
    }, [id, products]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h4" color="error">
                    Producto no encontrado
                </Typography>
                <Button component={Link} to="/products" variant="contained" sx={{ mt: 3 }}>
                    Volver a la lista de productos
                </Button>
            </Box>
        );
    }

    // Función para manejar la eliminación del producto
    const handleDelete = () => {
        deleteProductById(product.id);
        navigate("/products"); // Redirigir al listado de productos después de eliminar
    };

    // Función para manejar la compra
    const handleBuy = () => {
        alert(`Comprando ${product.title} por $${product.price}`);
        // Aquí podrías redirigir a una página de pago, o agregar al carrito, etc.
    };

    // Función para manejar la calificación
    const handleRatingSubmit = () => {
        alert(`Calificación enviada: ${ratingValue} estrellas`);
        setRatingModalOpen(false); // Cerrar el modal después de enviar
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: 2 }}>
            <Paper elevation={3} sx={{ width: "100%", maxWidth: "1200px", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <Grid container spacing={4}>
                    {/* Imagen del producto */}
                    <Grid item xs={12} md={6}>
                        <img
                            src={product.image}
                            alt={`Imagen de ${product.title}`}
                            style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                        />
                    </Grid>

                    {/* Detalles del producto */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                            {product.title}
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#27ae60", fontWeight: "bold", fontSize: "1.8rem", mb: 2 }}>
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
                            {product.description}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.80)" }}>
                            <strong>Categoría:</strong> {product.category}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.80)" }}>
                            <strong>Rating:</strong> {product.rating?.rate} ⭐ ({product.rating?.count} reseñas)
                        </Typography>

                        {/* Botones de acción */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Button
                                onClick={handleBuy}
                                variant="contained"
                                color="success"
                                sx={{
                                    borderRadius: "8px",
                                    padding: "12px 24px",
                                    fontSize: "1rem",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#2ecc71",
                                        color: "#fff",
                                    },
                                    width: "100%",
                                }}
                            >
                                Comprar
                            </Button>

                            <Button
                                onClick={() => setRatingModalOpen(true)}
                                variant="contained"
                                color="secondary"
                                sx={{
                                    borderRadius: "8px",
                                    padding: "12px 24px",
                                    fontSize: "1rem",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#f39c12",
                                        color: "#fff",
                                    },
                                    width: "100%",
                                }}
                            >
                                Calificar
                            </Button>

                            {/* Botón para eliminar el producto */}
                            <Button
                                onClick={handleDelete}
                                variant="contained"
                                color="error"
                                sx={{
                                    borderRadius: "8px",
                                    padding: "12px 24px",
                                    fontSize: "1rem",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#c0392b",
                                        color: "#fff",
                                    },
                                    width: "100%",
                                }}
                            >
                                Eliminar Producto
                            </Button>

                            {/* Botón para volver a la lista */}
                            <Button
                                component={Link}
                                to="/products"
                                variant="contained"
                                color="primary"
                                sx={{
                                    borderRadius: "8px",
                                    padding: "12px 24px",
                                    fontSize: "1rem",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#6a0dad",
                                        color: "#fff",
                                    },
                                    width: "100%",
                                }}
                            >
                                Volver a la lista de productos
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Modal para calificar */}
            <Modal
                open={ratingModalOpen}
                onClose={() => setRatingModalOpen(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Box sx={{ backgroundColor:'black', padding: 4, borderRadius: 2 }}>
                    <Typography variant="h5" >Calificar el Producto</Typography>
                    <TextField
                        label="Selecciona una calificación (1-5)"
                        type="number"
                        value={ratingValue}
                        onChange={(e) => setRatingValue(Number(e.target.value))}
                        sx={{ mt: 2, width: "100%" }}
                        variant="standard"
                        color="primary"
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Button onClick={() => setRatingModalOpen(false)} variant="outlined">
                            Cancelar
                        </Button>
                        <Button onClick={handleRatingSubmit} variant="contained" color="primary">
                            Enviar Calificación
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
