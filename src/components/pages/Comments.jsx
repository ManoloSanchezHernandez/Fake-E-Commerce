import React, { useState } from 'react';
import {
    Typography, Grid, Card, CardContent,
    Avatar, TextField, Button, Box
} from '@mui/material';

const Comentarios = () => {
    const [comentarios, setComentarios] = useState([
        { name: 'Juan Pérez', comment: 'Me encantó la simplicidad de la plataforma.' },
        { name: 'María López', comment: 'Ideal para aprender cómo funciona un e-commerce.' },
        { name: 'Carlos Gómez', comment: 'Experiencia fluida y muy bien diseñada.' },
        { name: 'Josias Castillo', comment: 'Algo increíble que no me deja de sorprender.' },
        { name: 'Ana García', comment: 'La experiencia de Fake E-Commerce ha sido increíble.' },
        { name: 'Aurora', comment: 'Los productos son de muy buena calidad.' }
    ]);

    const [nuevo, setNuevo] = useState({ name: '', comment: '' });

    const handleChange = (e) => {
        setNuevo({ ...nuevo, [e.target.name]: e.target.value });
    };

    const agregarComentario = () => {
        if (nuevo.name.trim() && nuevo.comment.trim()) {
            setComentarios([nuevo, ...comentarios]);
            setNuevo({ name: '', comment: '' });
        }
    };

    return (
        <Box sx={{ mt: 6, px: 2 }}>
            <Typography variant="h4" textAlign="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                Opiniones de Usuarios
            </Typography>

            {/* Formulario en una sola fila */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    mb: 4
                }}
            >
                <TextField
                    label="Nombre"
                    name="name"
                    value={nuevo.name}
                    onChange={handleChange}
                    size="small"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                />
                <TextField
                    label="Comentario"
                    name="comment"
                    value={nuevo.comment}
                    onChange={handleChange}
                    size="small"
                    sx={{ width: { xs: '100%', sm: 300 } }}
                />
                <Button
                    variant="contained"
                    onClick={agregarComentario}
                    sx={{ height: '40px', px: 3, fontWeight: 'bold' }}
                >
                    Agregar
                </Button>
            </Box>

            {/* Comentarios */}
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {comentarios.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                textAlign: 'center',
                                p: 2,
                                borderRadius: 4,
                                transition: '0.3s',
                                boxShadow: 4,
                                '&:hover': {
                                    boxShadow: 8,
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <CardContent>
                                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
                                    {user.name[0]}
                                </Avatar>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        fontStyle: 'italic',
                                        color: 'text.secondary'
                                    }}
                                >
                                    "{user.comment}"
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Comentarios;
