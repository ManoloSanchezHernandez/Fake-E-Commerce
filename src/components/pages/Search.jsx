// Search.js
import React, { useState, useEffect, useContext } from "react";
import { Grid, Paper, InputBase, IconButton, Typography, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext";

export default function Search() {
    const { products, setProducts } = useContext(ProductContext);  // Usar el contexto
    const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(false); // Error si no se encuentra el producto

    useEffect(() => {
        // Obtener productos de la API y localStorage
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(apiProducts => {
                const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
                // Combina y elimina duplicados
                const combinedProducts = [...apiProducts, ...localProducts];
                const uniqueProducts = combinedProducts.filter((product, index, self) =>
                    index === self.findIndex((p) => p.id === product.id)
                );
                setProducts(uniqueProducts); // Establece los productos únicos
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, [setProducts]); // Solo se ejecuta una vez al cargar

    // Función para manejar la búsqueda
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredProducts(filtered);
        setError(filtered.length === 0); // Si no hay productos encontrados, mostrar error
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(e); // Realiza la búsqueda al presionar Enter
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Buscar Productos
            </Typography>

            {/* Barra de búsqueda con Material UI */}
            <Grid container justifyContent="center" alignItems="center" sx={{ marginBottom: '20px' }}>
                <Grid item xs={12} sm={10} md={8}>
                    <Paper
                        component="form"
                        onSubmit={(e) => e.preventDefault()} // Evita el comportamiento por defecto del formulario
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            boxShadow: 3,
                            width: '100%',
                        }}
                    >
                        <InputBase
                            sx={{ ml: 2, flex: 1, fontSize: '18px' }}
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={handleSearch}
                            onKeyDown={handleKeyPress}
                        />
                        <IconButton onClick={(e) => handleSearch(e)} sx={{ p: '12px' }} color="primary">
                            <SearchIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>

            {/* Mensaje de error si no se encuentran productos */}
            {error && !loading && (
                <Typography variant="h6" color="error" align="center" gutterBottom>
                    Producto no encontrado, intente de nuevo
                </Typography>
            )}

            {/* Mostrar los productos o el mensaje de carga */}
            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
            ) : filteredProducts.length === 0 ? (
                <Typography variant="h6" align="center">
                    No hay productos para mostrar.
                </Typography>
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {filteredProducts.map((product) => (
                        <Grid key={product.id} item xs={12} sm={6} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 2,
                                    borderRadius: "12px",
                                    height: "320px", // Mayor altura para distribuir mejor el contenido
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    overflow: "hidden", // Evita que la imagen se desborde
                                    transition: "transform 0.3s ease, background-color 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        backgroundColor: "rgba(159, 0, 181, 0.5)",
                                        color: "#fff",
                                        "& h6, & button": {
                                            color: "#fff",
                                        },
                                    },
                                }}
                            >
                                {/* Imagen del producto (Ocupa 3/5 de la card) */}
                                <div style={{ flex: 3, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        style={{
                                            width: "50%",
                                            maxHeight: "90%", // Para que no sobresalga de la card
                                            objectFit: "contain", // Mantiene la proporción sin cortar la imagen
                                            borderRadius: "8px",
                                        }}
                                    />
                                </div>

                                {/* Información del producto (Ocupa 2/5 de la card) */}
                                <div style={{ flex: 2, paddingLeft: "10px", textAlign: "center" }}>
                                    {/* Nombre del producto */}
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{
                                            whiteSpace: "normal",
                                            wordWrap: "break-word",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {product.title}
                                    </Typography>

                                    {/* Botón para ver detalles */}
                                    <IconButton
                                        component={Link}
                                        to={`/products/${product.id}`} // Ruta dinámica con el ID del producto
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{
                                            borderRadius: "8px",
                                            marginTop: 1,
                                            transition: "background-color 0.3s ease",
                                            "&:hover": {
                                                backgroundColor: "#fff",
                                                color: "#6a0dad",
                                            },
                                        }}
                                    >
                                        Ver Detalles
                                    </IconButton>

                                    {/* Botón de compra */}
                                    <IconButton
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        sx={{
                                            borderRadius: "8px",
                                            marginTop: 1,
                                            transition: "background-color 0.3s ease",
                                            "&:hover": {
                                                backgroundColor: "rgb(63, 26, 75)",
                                            },
                                        }}
                                    >
                                        Comprar
                                    </IconButton>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}
