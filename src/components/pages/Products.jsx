import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext"; // Importar el Context

export default function Products() {
  const { products, setProducts } = useContext(ProductContext); // Usar el Context
  const [loading, setLoading] = useState(true);

  // Cargar productos de la API y localStorage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtener productos de la API
        const apiResponse = await fetch("https://fakestoreapi.com/products");
        const apiProducts = await apiResponse.json();

        // Obtener productos locales de localStorage
        const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];

        // Combinar ambos, evitando duplicados usando ID
        const combinedProducts = [...apiProducts, ...localProducts];

        // Eliminar productos duplicados basados en el ID
        const uniqueProducts = combinedProducts.filter((product, index, self) =>
          index === self.findIndex(p => p.id === product.id)
        );

        // Actualizar el estado en el contexto
        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]); // Dependencia en setProducts para asegurar que se actualice el contexto correctamente

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h1" component='h1' align="center" gutterBottom>
        <b> Productos Disponibles </b>
      </Typography>

      {/* Agregado el texto debajo del título principal */}
      <Typography variant="h4" align="center" sx={{ marginBottom: 5 }}>
        Descubre la variedad de productos que tenemos para ti
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : products.length === 0 ? (
        <Typography variant="h1" component='h1' align="center" color="error">
          No hay productos para mostrar
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: "12px",
                  height: "320px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  overflow: "hidden",
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
                <div style={{ flex: 3, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "60%",
                      
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div style={{ flex: 2, paddingLeft: "10px", textAlign: "center" }}>
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

                  <Button
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
                  </Button>

                  <Button
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
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
