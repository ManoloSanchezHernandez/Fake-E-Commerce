import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress, Container } from "@mui/material";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Estilos reutilizables
    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            
        },
        title: {
            fontWeight: "bold",
            color: 'white', // Color oscuro y elegante
            mb: 6,
            textAlign: "center",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsivo
            letterSpacing: "1px", // Espaciado entre letras
        },
        card: {
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff", // Fondo blanco
            color: "#2c3e50", // Texto oscuro
            borderRadius: "12px",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
            "&:hover": {
                transform: "translateY(-5px)", // Efecto de levitación
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)", // Sombra más pronunciada
            },
        },
        cardContent: {
            padding: "20px",
        },
        categoryText: {
            fontWeight: "bold",
            textTransform: "capitalize",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsivo
            color: "#34495e", // Color de texto más suave
        },
    };

    return (
        <Container maxWidth={false} sx={styles.container}>
            <Typography variant="h2" sx={styles.title}>
                Categorías de Productos
            </Typography>

            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "20px auto", color: "#2c3e50" }} />
            ) : (
                <Grid container spacing={3} justifyContent="center" sx={{ width: "100%", maxWidth: "1200px" }}>
                    {categories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={styles.card}>
                                <CardContent sx={styles.cardContent}>
                                    <Typography variant="h4" sx={styles.categoryText}>
                                        {category}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}