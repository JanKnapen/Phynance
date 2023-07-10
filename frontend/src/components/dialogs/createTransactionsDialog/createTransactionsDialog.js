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
    const {createTransactionsRequest, createPaymentRequestsRequest} = useContext(AxiosContext);
    const {handleSaveRequestError} = useContext(UtilsContext);
    const {
        processedTransactions,
        setProcessedTransactions,
        getBankAccount,
        paymentRequests,
        setPaymentRequests,
    } = useContext(BankContext);

    const handleCreateTransactions = () => {
        if (processedTransactions.every(transaction => transaction.category == null)) {
            enqueueErrorSnackbar('Please select a category for at least one transaction.');
        } else {
            const handleTransactionsResponse = () => {
                enqueueSuccessSnackbar('Successfully uploaded new transactions');
                const handlePaymentRequestsResponse = () => {
                    enqueueSuccessSnackbar('Successfully uploaded new payment requests');
                    setProcessedTransactions([]);
                    setPaymentRequests([]);
                    onClose();
                    getBankAccount(id);
                }
                const handlePaymentRequestsError = (error) => {
                    //TODO: REMOVE CREATED TRANSACTIONS
                    handleSaveRequestError(error, 'payment requests');
                }
                createPaymentRequestsRequest(paymentRequests, handlePaymentRequestsResponse, handlePaymentRequestsError);
            }
            const handleTransactionsError = (error) => {
                handleSaveRequestError(error, 'transactions');
            }
            const processedTransactionsWithCategory = processedTransactions.filter(transaction => transaction.category != null);
            createTransactionsRequest(processedTransactionsWithCategory, handleTransactionsResponse, handleTransactionsError);
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
