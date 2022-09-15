import FormatCategoryDialog from "../formatCategoryDialog";
import {useContext} from "react";
import BankContext from "../../../../../contexts/BankContext";
import AxiosContext from "../../../../../contexts/AxiosContext";
import NotificationsContext from "../../../../../contexts/NotificationsContext";
import UtilsContext from "../../../../../contexts/UtilsContext";

function EditCategoryDialog({ openEditCategory, setOpenEditCategory, editCategory, setEditCategory }) {
    const { enqueueSuccessSnackbar } = useContext(NotificationsContext);
    const { handleSaveRequestError } = useContext(UtilsContext);
    const { getCategories } = useContext(BankContext);
    const { updateCategoryRequest } = useContext(AxiosContext);

    const updateCategory = () => {
        const handleResponse = (response) => {
            enqueueSuccessSnackbar('Successfully updated category!');
            getCategories();
            setOpenEditCategory(false);
        }
        const handleError = (error) => {
            handleSaveRequestError(error, 'category');
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
