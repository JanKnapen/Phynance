import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Category} from "@mui/icons-material";
import CategoriesDialogTable from "./categoriesDialogTable";
import {useState} from "react";
import EditCategoryDialog from "./formatCategoryDialog/editCategoryDialog/editCategoryDialog";
import AddCategoryDialog from "./formatCategoryDialog/addCategoryDialog/addCategoryDialog";

function CategoriesDialog({ setOpenCategories, openCategories }) {
    const [openEditCategory, setOpenEditCategory] = useState(false);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    const handleCloseCategories = () => {
        setOpenCategories(false);
    };

    return (
        <>
            <Dialog
                onClose={handleCloseCategories}
                open={openCategories}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    onClose={handleCloseCategories}
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
                    Categories
                    <IconButton
                        onClick={handleCloseCategories}
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
                    <CategoriesDialogTable
                        setOpenEditCategory={setOpenEditCategory}
                        setEditCategory={setEditCategory}
                    />
                </DialogContent>
                <DialogActions style={{justifyContent: 'center'}}>
                    <Button
                        autoFocus
                        onClick={(event) => setOpenAddCategory(true)}
                        variant='contained'
                        style={{ width: 200 }}
                    >
                        Add A Category
                    </Button>
                </DialogActions>
            </Dialog>
            <EditCategoryDialog
                openEditCategory={openEditCategory}
                setOpenEditCategory={setOpenEditCategory}
                editCategory={editCategory}
                setEditCategory={setEditCategory}
            />
            <AddCategoryDialog
                openAddCategory={openAddCategory}
                setOpenAddCategory={setOpenAddCategory}
            />
        </>
    );
}

export default CategoriesDialog;
