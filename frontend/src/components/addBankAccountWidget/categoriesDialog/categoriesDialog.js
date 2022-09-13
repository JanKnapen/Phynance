import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Category} from "@mui/icons-material";
import CategoriesDialogTable from "./categoriesDialogTable";
import {useEffect, useState} from "react";
import EditCategoryDialog from "./editCategoryDialog/editCategoryDialog";
import AddCategoryDialog from "./addCategoryDialog/addCategoryDialog";

function CategoriesDialog({ setOpenCategories, openCategories }) {
    const [categories, setCategories] = useState([]);
    const [openEditCategory, setOpenEditCategory] = useState(false);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [categoryEditId, setCategoryEditId] = useState(null);

    const handleCloseCategories = () => {
        setOpenCategories(false);
    };

    useEffect(() => {
        if (openCategories === true) {
            setCategories([
                {
                    id: 1,
                    name: 'Food',
                    description: 'Category of Food',
                },
                {
                    id: 2,
                    name: 'Drinks',
                    description: 'Category of Drinks',
                },
            ])
        }
    }, [openCategories])

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
                        categories={categories}
                        setOpenEditCategory={setOpenEditCategory}
                        setCategoryEditId={setCategoryEditId}
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
                categories={categories}
                categoryEditId={categoryEditId}
            />
            <AddCategoryDialog
                openAddCategory={openAddCategory}
                setOpenAddCategory={setOpenAddCategory}
            />
        </>
    );
}

export default CategoriesDialog;