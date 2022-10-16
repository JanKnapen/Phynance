import DialogTemplate from "../templates/dialog/dialogTemplate";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {useContext, useState} from "react";
import BankContext from "../../../contexts/BankContext";
import AddBankAccountDialogContent from "./addBankAccountDialogContent";
import UtilsContext from "../../../contexts/UtilsContext";

function AddBankAccountDialog({
                                  maxWidth,
                                  actionWidth,
                                  open,
                                  onClose,
                              }) {
    const {
        createBankAccount,
    } = useContext(BankContext);
    const {currencies} = useContext(UtilsContext);

    const [newBankAccount, setNewBankAccount] = useState({
        name: null,
        description: null,
        IBAN: null,
        currency: currencies[0],
    });

    const addBankAccount = () => {
        createBankAccount(newBankAccount, setNewBankAccount, onClose);
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
            content={<AddBankAccountDialogContent onInputChange={inputChanged} defaultCurrency={currencies[0]}/>}
            action={addBankAccount}
            actionText='Add'
        />
    )
}

export default AddBankAccountDialog;
