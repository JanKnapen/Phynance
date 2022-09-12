import {Button, Container, Switch} from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function TopBar({ setAuthenticatedCredentials }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openSettings = (event) => {
        navigate('/settings');
    }

    const logOut = (event) => {
        setAuthenticatedCredentials(null);
        navigate('/login');
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <SavingsIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        onClick={(event) => navigate('/home')}
                        style={{cursor: 'pointer'}}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={(event) => navigate('/home')}
                        style={{cursor: 'pointer'}}
                    >
                        Phynance
                    </Typography>
                    <Button
                        key="Home"
                        onClick={(event) => navigate('/home')}
                        sx={{ flexGrow: 1, mr: 270, my: 2, color: 'white', display: 'block' }}
                    >
                        Home
                    </Button>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={openSettings}>Settings</MenuItem>
                            <MenuItem>
                                <div>Dark Theme</div>
                                <Switch />
                            </MenuItem>
                            <MenuItem onClick={logOut}>Log Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default TopBar;