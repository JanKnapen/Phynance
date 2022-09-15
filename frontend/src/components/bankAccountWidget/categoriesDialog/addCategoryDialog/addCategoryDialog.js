import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Category} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import {createElement, useContext, useState} from "react";
import UtilsContext from "../../../../contexts/UtilsContext";
import AxiosContext from "../../../../contexts/AxiosContext";
import BankContext from "../../../../contexts/BankContext";

function AddCategoryDialog({ openAddCategory, setOpenAddCategory }) {
    const { getCategories } = useContext(BankContext);
    const { createCategoryRequest } = useContext(AxiosContext);
    const { MUIIcons } = useContext(UtilsContext);
    const [newCategory, setNewCategory] = useState({
        name: null,
        description: null,
        icon: null,
    });

    const handleCloseAddCategory = () => {
        setOpenAddCategory(false);
    };

    const addCategory = () => {
        const handleResponse = (response) => {
            getCategories();
            handleCloseAddCategory();
        }
        const handleError = (error) => {
            //TODO: notification
        }

        createCategoryRequest(newCategory, handleResponse, handleError);
    }

    const inputChanged = event => {
        let newInput = event.target.value;
        if (event.target.name === 'icon') {
            newInput = MUIIcons.filter(MUIIcon => MUIIcon.name === event.target.value)[0].id;
        }
        setNewCategory(prevState => ({
            ...prevState,
            [event.target.name]: newInput,
        }));
    }

    return (
        <Dialog
            onClose={handleCloseAddCategory}
            open={openAddCategory}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                onClose={handleCloseAddCategory}
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
                    <Category />
                </IconButton>
                Add Category
                <IconButton
                    onClick={handleCloseAddCategory}
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
                            name='name'
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
                            name='description'
                            multiline
                            rows={3}
                            maxRows={3}
                            fullWidth
                            onChange={inputChanged}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ marginTop: 10, fontWeight: 'bold' }}>
                            Icon:
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Select
                            style={{
                                width: '70%',
                            }}
                            label='Icon'
                            name='icon'
                            defaultValue={''}
                            renderValue={(value) => {
                                if (value === '') return <></>
                                const icon = MUIIcons.filter(MUIIcon => MUIIcon.name === value)[0].icon
                                return (
                                    createElement(icon, {key: icon}, null)
                                )
                            }}
                            onChange={inputChanged}
                        >
                            {MUIIcons.map(MUIIcon => (
                                <MenuItem
                                    value={MUIIcon.name}
                                    key={MUIIcon.name}
                                >
                                    {createElement(MUIIcon.icon, {key: MUIIcon.icon}, null)}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{justifyContent: 'center'}}>
                <Button
                    autoFocus
                    onClick={addCategory}
                    variant='contained'
                    style={{ width: 150 }}
                >
                    Save & Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCategoryDialog;
