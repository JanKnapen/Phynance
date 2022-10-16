import {Receipt} from "@mui/icons-material";
import CategoriesDialogTable from "./categoriesDialogTable";
import {useState} from "react";
import DialogTemplate from "../templates/dialog/dialogTemplate";
import EditCategoryDialog from "../formatCategoryDialog/editCategoryDialog";
import AddCategoryDialog from "../formatCategoryDialog/addCategoryDialog";

function CategoriesDialog({maxWidth, setOpenCategories, openCategories}) {
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
            <DialogTemplate
                maxWidth={maxWidth}
                open={openCategories}
                onClose={handleCloseCategories}
                titleIcon={<Receipt/>}
                titleText='Categories'
                content={
                    <CategoriesDialogTable
                        setOpenEditCategory={setOpenEditCategory}
                        setEditCategory={setEditCategory}
                    />
                }
                action={() => setOpenAddCategory(true)}
                actionText='Add a category'
                actionWidth='30%'
            />
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
