import {Container, IconButton, Switch} from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import NotificationsContext from "../contexts/NotificationsContext";
import CustomThemeContext from "../contexts/CustomThemeProvider";

function TopBar({ isPrivate }) {
    const { enqueueSuccessSnackbar } = useContext(NotificationsContext);
    const { switchTheme } = useContext(CustomThemeContext);
    const { logoutUser } = useContext(AuthContext);
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
        logoutUser();
        enqueueSuccessSnackbar('Successfully logged out!');
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <SavingsIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}
                        onClick={isPrivate ? (event) => navigate('/home') : null}
                        style={{cursor: isPrivate ? 'pointer' : ''}}
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
                            letterSpacing: '.2rem',
                            textDecoration: 'none',
                        }}
                        onClick={isPrivate ? (event) => navigate('/home') : null}
                        style={{cursor: isPrivate ? 'pointer' : ''}}
                    >
                        Phynance
                    </Typography>
                    <div style={{width: "80vw"}}></div>
                    {isPrivate ?
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <AccountCircle/>
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
                                    <div>Dark Mode</div>
                                    <Switch
                                        onClick={() => {
                                            switchTheme();
                                        }}
                                    />
                                </MenuItem>
                                <MenuItem onClick={logOut}>Log Out</MenuItem>
                            </Menu>
                        </div>
                        :
                        <div>Dark Mode</div>
                    }
                    {isPrivate ? null :
                        <Switch
                            onClick={() => {
                                switchTheme();
                            }}
                        />
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default TopBar;
