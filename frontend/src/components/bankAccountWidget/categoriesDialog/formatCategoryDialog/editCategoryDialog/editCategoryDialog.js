import FormatCategoryDialog from "../formatCategoryDialog";
import {useContext} from "react";
import BankContext from "../../../../../contexts/BankContext";
import AxiosContext from "../../../../../contexts/AxiosContext";

function EditCategoryDialog({ openEditCategory, setOpenEditCategory, editCategory, setEditCategory }) {
    const { getCategories } = useContext(BankContext);
    const { updateCategoryRequest } = useContext(AxiosContext);

    const updateCategory = () => {
        const handleResponse = (response) => {
            getCategories();
            setOpenEditCategory(false);
        }
        const handleError = (error) => {
            //TODO: notification
        }

        updateCategoryRequest(editCategory, handleResponse, handleError);
    }

    return (
        <FormatCategoryDialog
            openFormatCategory={openEditCategory}
            setOpenFormatCategory={setOpenEditCategory}
            confirmText='Save & Close'
            handleConfirm={updateCategory}
            formatCategory={editCategory}
            setFormatCategory={setEditCategory}
        />
    );
}

export default EditCategoryDialog;
