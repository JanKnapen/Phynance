import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import BankContext from "../contexts/BankContext";
import CustomThemeContext from "../contexts/CustomThemeProvider";

function Sidebar() {
    const {theme} = useContext(CustomThemeContext);
    const {bankAccountsInfo, getBankAccountsInfo} = useContext(BankContext);
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 200,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: 200},
            }}
        >
            <Toolbar/>
            <Box style={{backgroundColor: theme.palette.sidebar.menuHeader}}>
                <List>
                    <ListItem key="Home" disablePadding>
                        <ListItemButton
                            onClick={() => {
                                getBankAccountsInfo();
                                navigate('/home');
                            }}
                        >
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem key="Overview" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EqualizerIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Overview"/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem key="Bank Accounts" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBalanceIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Bank Accounts"/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                {bankAccountsInfo.length > 0 && (
                    <List style={{backgroundColor: theme.palette.sidebar.menuItem}}>
                        {bankAccountsInfo.map((bankAccount) => (
                            <ListItem key={bankAccount.name} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        navigate('/bank_account/' + bankAccount.id);
                                    }}
                                >
                                    <ListItemIcon>
                                        <HorizontalRuleIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={bankAccount.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
                {bankAccountsInfo.length > 0 && (
                    <Divider/>
                )}
            </Box>
        </Drawer>
    );
}

export default Sidebar;
