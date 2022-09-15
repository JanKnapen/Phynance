import InputDialogTemplate from "../inputDialogTemplate";
import {Category} from "@mui/icons-material";
import EditCategoryDialogContent from "./editCategoryDialogContent";
import {useContext} from "react";
import NotificationsContext from "../../../../contexts/NotificationsContext";
import UtilsContext from "../../../../contexts/UtilsContext";
import BankContext from "../../../../contexts/BankContext";
import AxiosContext from "../../../../contexts/AxiosContext";

function EditCategoryDialog({
    maxWidth,
    actionWidth,
    open,
    onClose,
    editCategory,
    setEditCategory,
                            }) {
    const { enqueueSuccessSnackbar } = useContext(NotificationsContext);
    const { handleSaveRequestError } = useContext(UtilsContext);
    const { getCategories } = useContext(BankContext);
    const { updateCategoryRequest } = useContext(AxiosContext);
    const { MUIIcons } = useContext(UtilsContext);

    const updateCategory = () => {
        const handleResponse = (response) => {
            enqueueSuccessSnackbar('Successfully updated category!');
            getCategories();
            onClose();
        }
        const handleError = (error) => {
            handleSaveRequestError(error, 'category');
        }

        updateCategoryRequest(editCategory, handleResponse, handleError);
    }

    const inputChanged = event => {
        let newInput = event.target.value;
        if (event.target.name === 'icon') {
            newInput = MUIIcons.filter(MUIIcon => MUIIcon.name === event.target.value)[0].id;
        }
        setEditCategory(prevState => ({
            ...prevState,
            [event.target.name]: newInput,
        }));
    }

    return (
        <InputDialogTemplate
            maxWidth={maxWidth}
            actionWidth={actionWidth}
            open={open}
            onClose={onClose}
            titleIcon={<Category />}
            titleText='Edit Category'
            content={<EditCategoryDialogContent
                editCategory={editCategory}
                onInputChange={inputChanged}
            />}
            action={updateCategory}
            actionText='Save & Close'
        />
    )
}

export default EditCategoryDialog;
