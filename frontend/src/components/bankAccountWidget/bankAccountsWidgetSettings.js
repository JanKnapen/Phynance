import {ClickAwayListener, Grow, ListItemIcon, ListItemText, MenuList, Paper, Popper} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {AddCard, Category} from "@mui/icons-material";

function BankAccountsWidgetSettings({
                                        openSettings,
                                        setOpenSettings,
                                        setOpenAddBankAccount,
                                        setOpenCategories,
                                        anchorRefSettings
                                    }) {

    const handleOpenAddBankAccount = () => {
        setOpenSettings(false);
        setOpenAddBankAccount(true);
    };

    const handleOpenCategories = () => {
        setOpenSettings(false);
        setOpenCategories(true);
    };

    const handleCloseSettings = (event) => {
        if (anchorRefSettings.current && anchorRefSettings.current.contains(event.target)) {
            return;
        }

        setOpenSettings(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenSettings(false);
        } else if (event.key === 'Escape') {
            setOpenSettings(false);
        }
    }

    return (
        <Popper
            open={openSettings}
            anchorEl={anchorRefSettings.current}
            transition
            disablePortal
        >
            {({TransitionProps}) => (
                <Grow
                    {...TransitionProps}
                    style={{transformOrigin: 'right top'}}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleCloseSettings}>
                            <MenuList
                                autoFocusItem={openSettings}
                                onKeyDown={handleListKeyDown}
                            >
                                <MenuItem onClick={handleOpenAddBankAccount}>
                                    <ListItemIcon>
                                        <AddCard/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <div style={{textAlign: 'left'}}>Add Bank Account</div>
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleOpenCategories}>
                                    <ListItemIcon>
                                        <Category/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <div style={{textAlign: 'left'}}>Categories</div>
                                    </ListItemText>
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}

export default BankAccountsWidgetSettings;
