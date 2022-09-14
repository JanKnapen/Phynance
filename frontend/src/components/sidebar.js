import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Sidebar() {
    const navigate = useNavigate();
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(() => {
        setBankAccounts([]);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 200,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }} style={{backgroundColor: 'lightgray'}}>
                <List>
                    <ListItem key="Home" disablePadding>
                        <ListItemButton
                            onClick={event => {
                                navigate('/home');
                            }}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem key="Overview" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Overview" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem key="Bank Accounts" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bank Accounts" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                {bankAccounts.length > 0 && (
                    <List style={{backgroundColor: 'white'}}>
                        {bankAccounts.map((bankAccount, index) => (
                            <ListItem key={bankAccount.name} disablePadding>
                                <ListItemButton
                                    onClick={event => {
                                        navigate('/bank_account/' + bankAccount.id);
                                    }}
                                >
                                    <ListItemIcon>
                                        <HorizontalRuleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={bankAccount.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
                {bankAccounts.length > 0 && (
                    <Divider />
                )}
            </Box>
        </Drawer>
    );
}

export default Sidebar;
