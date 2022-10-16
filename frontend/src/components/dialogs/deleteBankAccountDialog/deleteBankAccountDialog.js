import ConfirmationDialogTemplate from "../templates/confirmationDialog/confirmationDialogTemplate";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {useContext} from "react";
import BankContext from "../../../contexts/BankContext";

function DeleteBankAccountDialog({
                                     open,
                                     onClose,
                                 }) {
    const {
        deleteBankAccount
    } = useContext(BankContext);

    return (
        <ConfirmationDialogTemplate
            open={open}
            onClose={onClose}
            titleIcon={<AccountBalanceIcon/>}
            text='Are you sure you want to delete this bank account?'
            onConfirmation={() => deleteBankAccount(onClose)}
        />
    )
}

export default DeleteBankAccountDialog;
