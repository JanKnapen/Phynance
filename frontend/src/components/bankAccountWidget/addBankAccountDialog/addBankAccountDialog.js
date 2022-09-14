import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import {useContext, useState} from "react";
import AxiosContext from "../../../contexts/AxiosContext";

function AddBankAccountDialog({ setOpenAddBankAccount, openAddBankAccount }) {
    const { createBankAccountRequest } = useContext(AxiosContext);
    const [newBankAccount, setNewBankAccount] = useState({
        name: null,
        description: null,
        IBAN: null,
    });

    const handleCloseAddBankAccount = () => {
        setOpenAddBankAccount(false);
    };

    const addBankAccount = () => {
        const handleResponse = (response) => {
            handleCloseAddBankAccount();
        }
        const handleError = (error) => {
            //TODO: notification
        }

        createBankAccountRequest(newBankAccount, handleResponse, handleError);
    }

    const inputChanged = event => {
        setNewBankAccount(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <Dialog
            onClose={handleCloseAddBankAccount}
            open={openAddBankAccount}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                onClose={handleCloseAddBankAccount}
                style={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <IconButton
                    disabled
                    sx={{
                        position: 'absolute',
                        left: 12,
                        top: 12,
                        ":disabled": {
                            color: 'white',
                        },
                    }}
                >
                    <AccountBalanceIcon />
                </IconButton>
                Add Bank Account
                <IconButton
                    onClick={handleCloseAddBankAccount}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        color: 'white',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} pl={2} pt={2} pr={2}>
                    <Grid item xs={3} >
                        <div style={{ marginTop: 20, fontWeight: 'bold' }}>
                            Name:
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={9}
                    >
                        <TextField
                            label="Name"
                            name="name"
                            variant="standard"
                            style={{
                                marginLeft: 15,
                                width: '50%',
                            }}
                            onChange={inputChanged}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ marginTop: 10, fontWeight: 'bold' }}>
                            Description:
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            maxRows={3}
                            fullWidth
                            onChange={inputChanged}
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <div style={{ marginTop: 20, fontWeight: 'bold' }}>
                            IBAN:
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={9}
                    >
                        <TextField
                            label="IBAN"
                            name="IBAN"
                            variant="standard"
                            style={{
                                marginLeft: 15,
                                width: '50%',
                            }}
                            onChange={inputChanged}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{justifyContent: 'center'}}>
                <Button
                    autoFocus
                    onClick={addBankAccount}
                    variant='contained'
                    style={{ width: 200 }}
                >
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddBankAccountDialog;
