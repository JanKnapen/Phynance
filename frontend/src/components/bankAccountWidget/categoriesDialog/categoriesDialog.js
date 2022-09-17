import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Category} from "@mui/icons-material";
import CategoriesDialogTable from "./categoriesDialogTable";
import {useState} from "react";
import EditCategoryDialog from "../../dialogs/inputDialogs/formatCategoryDialog/editCategoryDialog";
import AddCategoryDialog from "../../dialogs/inputDialogs/formatCategoryDialog/addCategoryDialog";

function CategoriesDialog({ setOpenCategories, openCategories }) {
    const [openEditCategory, setOpenEditCategory] = useState(false);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    const handleCloseCategories = () => {
        setOpenCategories(false);
    };

    const handleCloseEditCategoryDialog = () => {
        setOpenEditCategory(false);
    }

    const handleCloseAddCategoryDialog = () => {
        setOpenAddCategory(false);
    }

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
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: 20,
                            top: 20,
                        }}
                    >
                        <Category />
                    </div>
                    Categories
                    <IconButton
                        onClick={handleCloseCategories}
                        sx={{
                            position: 'absolute',
                            right: 12,
                            top: 12,
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
                maxWidth='sm'
                actionWidth={150}
                open={openEditCategory}
                onClose={handleCloseEditCategoryDialog}
                editCategory={editCategory}
                setEditCategory={setEditCategory}
            />
            <AddCategoryDialog
                maxWidth='sm'
                actionWidth={150}
                open={openAddCategory}
                onClose={handleCloseAddCategoryDialog}
            />
        </>
    );
}

export default CategoriesDialog;
