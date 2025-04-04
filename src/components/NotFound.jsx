import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <Box 
            sx={{   
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'red',
                textAlign: 'center'
            }}
        >
            <Typography variant="h1" component="h1">
                <b>404 Not Found!</b>
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, color: 'gray' }}>
                La página que buscas no existe.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/" 
                sx={{ mt: 3 }}
            >
                Volver al inicio
            </Button>
        </Box>
    );
}
