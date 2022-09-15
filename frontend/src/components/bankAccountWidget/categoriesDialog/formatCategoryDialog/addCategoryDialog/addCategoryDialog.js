import {useContext, useState} from "react";
import AxiosContext from "../../../../../contexts/AxiosContext";
import BankContext from "../../../../../contexts/BankContext";
import FormatCategoryDialog from "../formatCategoryDialog";
import NotificationsContext from "../../../../../contexts/NotificationsContext";
import UtilsContext from "../../../../../contexts/UtilsContext";

function AddCategoryDialog({ openAddCategory, setOpenAddCategory }) {
    const { handleSaveRequestError } = useContext(UtilsContext);
    const { enqueueSuccessSnackbar } = useContext(NotificationsContext);
    const { getCategories } = useContext(BankContext);
    const { createCategoryRequest } = useContext(AxiosContext);
    const [newCategory, setNewCategory] = useState({
        name: null,
        description: null,
        icon: null,
    });

    const addCategory = () => {
        const handleResponse = (response) => {
            enqueueSuccessSnackbar('Successfully created category!')
            getCategories();
            setOpenAddCategory(false);
        }
        const handleError = (error) => {
            handleSaveRequestError(error, 'category');
        }

        createCategoryRequest(newCategory, handleResponse, handleError);
    }

    return (
        <FormatCategoryDialog
            openFormatCategory={openAddCategory}
            setOpenFormatCategory={setOpenAddCategory}
            confirmText='Add'
            handleConfirm={addCategory}
            setFormatCategory={setNewCategory}
        />
    );
}

export default AddCategoryDialog;
