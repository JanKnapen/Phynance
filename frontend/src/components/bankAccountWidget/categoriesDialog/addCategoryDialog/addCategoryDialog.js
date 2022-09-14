import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Category} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

function AddCategoryDialog({ openAddCategory, setOpenAddCategory }) {
    const handleCloseAddCategory = () => {
        setOpenAddCategory(false);
    };

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
                            variant="standard"
                            style={{
                                marginLeft: 15,
                                width: '50%',
                            }}
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
                            multiline
                            rows={3}
                            maxRows={3}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{justifyContent: 'center'}}>
                <Button
                    autoFocus
                    onClick={handleCloseAddCategory}
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
