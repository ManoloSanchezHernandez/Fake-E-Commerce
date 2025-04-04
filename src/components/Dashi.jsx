import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Link } from 'react-router-dom';

const pages = [
  { name: "Products", icon: <MenuIcon />, path: "/products" },
  { name: "Search", icon: <AdbIcon />, path: "/search" },
  { name: "Add", icon: <SearchIcon />, path: "/add" },
  { name: "Comment", icon: <AddCommentIcon />, path: "/comentarios" }
];

function Dashi() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: "linear-gradient(90deg, rgb(199, 129, 208) 0%, rgb(69, 5, 69) 100%)",
                boxShadow: '0 0 10px rgba(159, 0, 181, 0.5)',
                padding: '0 20px',
                fontFamily: 'Poppins',
                fontWeight: 700,
                letterSpacing: '.02rem',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "space-between", 
                        alignItems: "center",
                        minHeight: "90px",
                        paddingY: "10px",
                    }}
                >
                    {/* LOGO */}
                    <Typography
                        component="a"
                        href="/"
                        sx={{
                            display: "flex",
                            alignItems: "center", 
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src="https://fakestoreapi.com/icons/logo.png"
                            alt="Logo"
                            style={{ height: "60px" }}
                        />
                    </Typography>

                    {/* Menú Hamburguesa para Móviles */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            onClick={handleOpenNavMenu}
                            sx={{ color: "white" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography component={Link} to={page.path} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {page.icon} {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Menú de Navegación para Desktop */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            gap: 3,
                            alignItems: "center",
                            paddingY: "10px",
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.path}
                                sx={{
                                    fontSize: "18px",
                                    color: "white",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    textTransform: "none"
                                }}
                            >
                                {page.icon} {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Avatar / User Menu */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt="FakeUser"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ width: 50, height: 50 }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Dashi;
