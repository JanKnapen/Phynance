import {useContext, useState} from "react";
import AxiosContext from "../../../../../contexts/AxiosContext";
import BankContext from "../../../../../contexts/BankContext";
import FormatCategoryDialog from "../formatCategoryDialog";

function AddCategoryDialog({ openAddCategory, setOpenAddCategory }) {
    const { getCategories } = useContext(BankContext);
    const { createCategoryRequest } = useContext(AxiosContext);
    const [newCategory, setNewCategory] = useState({
        name: null,
        description: null,
        icon: null,
    });

    const addCategory = () => {
        const handleResponse = (response) => {
            getCategories();
            setOpenAddCategory(false);
        }
        const handleError = (error) => {
            //TODO: notification
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
