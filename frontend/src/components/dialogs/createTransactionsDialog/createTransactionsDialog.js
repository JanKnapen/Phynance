import DialogTemplate from "../templates/dialog/dialogTemplate";
import {Receipt} from "@mui/icons-material";
import CreateTransactionsDialogContent from "./createTransactionsDialogContent";
import {useContext} from "react";
import BankContext from "../../../contexts/BankContext";
import NotificationsContext from "../../../contexts/NotificationsContext";
import AxiosContext from "../../../contexts/AxiosContext";
import {useParams} from "react-router-dom";
import UtilsContext from "../../../contexts/UtilsContext";

function CreateTransactionsDialog({open, onClose, maxWidth}) {
    const {id} = useParams();
    const {enqueueErrorSnackbar, enqueueSuccessSnackbar} = useContext(NotificationsContext);
    const {createTransactionsRequest} = useContext(AxiosContext);
    const {handleSaveRequestError} = useContext(UtilsContext);
    const {
        processedTransactions,
        getBankAccount,
    } = useContext(BankContext);

    const handleCreateTransactions = () => {
        if (processedTransactions.every(transaction => transaction.category == null)) {
            enqueueErrorSnackbar('Please select a category for at least one transaction.');
        } else {
            const handleResponse = () => {
                enqueueSuccessSnackbar('Successfully uploaded new transactions');
                onClose();
                getBankAccount(id);
            }
            const handleError = (error) => {
                handleSaveRequestError(error, 'transactions');
            }
            const processedTransactionsWithCategory = processedTransactions.filter(transaction => transaction.category != null);
            console.log(processedTransactionsWithCategory);
            createTransactionsRequest(processedTransactionsWithCategory, handleResponse, handleError);
        }
    }

    return (
        <DialogTemplate
            maxWidth={maxWidth}
            open={open}
            onClose={onClose}
            titleIcon={<Receipt/>}
            titleText='Create Transactions'
            content={<CreateTransactionsDialogContent/>}
            action={handleCreateTransactions}
            actionText='Create'
            actionWidth='30%'
        />
    )
}

export default CreateTransactionsDialog;
