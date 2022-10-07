import DialogTemplate from "../dialogTemplate";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {useContext, useState} from "react";
import NotificationsContext from "../../../contexts/NotificationsContext";
import BankContext from "../../../contexts/BankContext";
import UtilsContext from "../../../contexts/UtilsContext";
import AxiosContext from "../../../contexts/AxiosContext";
import AddBankAccountDialogContent from "./addBankAccountDialogContent";

function AddBankAccountDialog({
                                  maxWidth,
                                  actionWidth,
                                  open,
                                  onClose,
                              }) {
    const {enqueueSuccessSnackbar} = useContext(NotificationsContext);
    const {getBankAccountsInfo} = useContext(BankContext);
    const {handleSaveRequestError} = useContext(UtilsContext);
    const {createBankAccountRequest} = useContext(AxiosContext);

    const [newBankAccount, setNewBankAccount] = useState({
        name: null,
        description: null,
        IBAN: null,
        currency: null,
    });

    const addBankAccount = () => {
        const handleResponse = (response) => {
            enqueueSuccessSnackbar('Successfully created bank account!');
            setNewBankAccount({
                name: null,
                description: null,
                IBAN: null,
                currency: null,
            });
            getBankAccountsInfo();
            onClose();
        }
        const handleError = (error) => {
            handleSaveRequestError(error, 'bank account');
        }

        createBankAccountRequest(newBankAccount, handleResponse, handleError);
    }

    const inputChanged = event => {
        setNewBankAccount(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <DialogTemplate
            maxWidth={maxWidth}
            actionWidth={actionWidth}
            open={open}
            onClose={onClose}
            titleIcon={<AccountBalanceIcon/>}
            titleText='Add Bank Account'
            content={<AddBankAccountDialogContent onInputChange={inputChanged}/>}
            action={addBankAccount}
            actionText='Add'
        />
    )
}

export default AddBankAccountDialog;
