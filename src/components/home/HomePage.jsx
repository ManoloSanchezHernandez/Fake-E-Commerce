import React from 'react';
import { Grid, Box, Button, Container, Typography, Card, CardContent, Avatar, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        flexGrow: 1,
                        py: 6,
                        textAlign: 'center',
                        background: 'linear-gradient(to right, rgb(70, 3, 116), rgba(212, 95, 255, 0.87))',
                        color: 'white',
                        borderRadius: 3,
                        padding: 4,
                        marginTop: 10,
                        flex: 1,
                    }}
                >
                    <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '4rem' } }}>
                        Welcome to Fake <br /> E-Commerce
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.3rem', mt: 2 }}>
                        Explora productos, gestiona datos y experimenta cómo funciona un e-commerce desde dentro.
                    </Typography>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/products"
                            sx={{
                                fontSize: '1.2rem',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                transition: "0.3s",
                                "&:hover": { backgroundColor: 'rgb(48, 3, 53)' }
                            }}
                        >
                            Ver productos
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: '80px', px: { xs: 3, md: 6 } }}>
                    <img
                        src="https://dnclcgcvl4f14.cloudfront.net/siila-cm/prd/1280w/7864-1686852695185.jpg"
                        alt="Fake E-Commerce website"
                        style={{
                            width: "100%",
                            maxWidth: "400px", // Máximo tamaño en pantallas grandes
                            height: "auto", // Mantiene la proporción
                            borderRadius: "8px",
                            
                        }}
                    />
                </Box>

            </Box>

            {/* Sección de Características */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" textAlign="center" sx={{ fontWeight: 'bold' }}>
                    ¿Por qué usar Fake E-Commerce?
                </Typography>
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {[
                        { title: 'Simulación Realista', desc: 'Explora productos y gestiona datos en un entorno de prueba.' },
                        { title: 'Fácil de Usar', desc: 'Interfaz intuitiva con navegación sencilla, siendo bastante intuitivo.' },
                        { title: 'Aprendizaje Práctico', desc: 'Ideal para desarrolladores que quieran entender e-commerce.' }
                    ].map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{ textAlign: 'center', p: 2, boxShadow: 3, elevation: 4 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{feature.title}</Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>{feature.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Sección de Testimonios */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" textAlign="center" sx={{ fontWeight: 'bold' }}>
                    Opiniones de Usuarios
                </Typography>
                <Grid container spacing={3} sx={{ mt: 3, justifyContent: 'center' }}>
                    {[
                        { name: 'Juan Pérez', comment: 'Me encantó la simplicidad de la plataforma.' },
                        { name: 'María López', comment: 'Ideal para aprender cómo funciona un e-commerce.' },
                        { name: 'Carlos Gómez', comment: 'Experiencia fluida y muy bien diseñada.' },
                        { name: 'Josias Castillo', comment: 'Algo increíble que no me deja de sorprender.' },
                        { name: 'Ana García', comment: 'La experiencia de Fake E-Commerce ha sido increíble.' },
                        { name: 'Aurora', comment: 'Los productos son de muy buena calidad.' }
                    ].map((user, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card sx={{ textAlign: 'center', p: 2, boxShadow: 3, elevation: 4 }}>
                                <CardContent>
                                    <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 1 }}>
                                        {user.name[0]}
                                    </Avatar>
                                    <Typography variant="h5">{user.name}</Typography>
                                    <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic' }}>
                                        "{user.comment}"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
