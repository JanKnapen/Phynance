import DialogTemplate from "../templates/dialog/dialogTemplate";
import {Category} from "@mui/icons-material";
import AddCategoryDialogContent from "./addCategoryDialogContent";
import {useContext, useState} from "react";
import NotificationsContext from "../../../contexts/NotificationsContext";
import BankContext from "../../../contexts/BankContext";
import UtilsContext from "../../../contexts/UtilsContext";
import AxiosContext from "../../../contexts/AxiosContext";

function AddCategoryDialog({
                               maxWidth,
                               actionWidth,
                               open,
                               onClose,
                           }) {
    const {enqueueSuccessSnackbar} = useContext(NotificationsContext);
    const {addCategory} = useContext(BankContext);
    const {handleSaveRequestError} = useContext(UtilsContext);
    const {createCategoryRequest} = useContext(AxiosContext);
    const {MUIIcons} = useContext(UtilsContext);

    const [newCategory, setNewCategory] = useState({
        name: null,
        description: null,
        icon: null,
    });

    const addCategoryAction = () => {
        const handleResponse = (response) => {
            enqueueSuccessSnackbar('Successfully created category!');
            addCategory(response.data);
            onClose();
        }
        const handleError = (error) => {
            handleSaveRequestError(error, 'category');
        }

        createCategoryRequest(newCategory, handleResponse, handleError);
    }

    const inputChanged = event => {
        let newInput = event.target.value;
        if (event.target.name === 'icon') {
            newInput = MUIIcons.filter(MUIIcon => MUIIcon.name === event.target.value)[0].id;
        }
        setNewCategory(prevState => ({
            ...prevState,
            [event.target.name]: newInput,
        }));
    }

    return (
        <DialogTemplate
            maxWidth={maxWidth}
            actionWidth={actionWidth}
            open={open}
            onClose={onClose}
            titleIcon={<Category/>}
            titleText='Add Category'
            content={<AddCategoryDialogContent
                onInputChange={inputChanged}
            />}
            action={addCategoryAction}
            actionText='Add'
        />
    )
}

export default AddCategoryDialog;
