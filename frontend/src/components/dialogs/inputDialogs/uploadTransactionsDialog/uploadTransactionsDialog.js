import Papa from "papaparse";
import {useContext, useState} from "react";
import BankContext from "../../../../contexts/BankContext";
import {Receipt} from "@mui/icons-material";
import UploadTransactionsDialogContent from "./uploadTransactionsDialogContent";
import InputDialogTemplate from "../inputDialogTemplate";
import NotificationsContext from "../../../../contexts/NotificationsContext";

function UploadTransactionsDialog({ open, onClose, maxWidth, setOpenCreateTransactionsDialog }) {
    const { enqueueErrorSnackbar } = useContext(NotificationsContext);
    const {
        bankAccount,
        processTransactions,
    } = useContext(BankContext);
    const [uploadSettings, setUploadSettings] = useState({
        language: 'NL',
        bank: 'Rabobank',
        file: null,
    });

    const handleTransactionsComplete = (results) => {
        const transactions = results.data.filter((row) => row['Volgnr'] != null).map((row) => ({
            bank_account: bankAccount.id,
            date: row['Datum'],
            amount: parseFloat(row['Bedrag'].replace(',', '.')),
            serial_number: parseInt(row['Volgnr']),
            counter_party_IBAN: row['Tegenrekening IBAN/BBAN'],
            counter_party_name: row['Naam tegenpartij'],
            balance_after: parseFloat(row['Saldo na trn'].replace(',', '.')),
            description: row['Omschrijving-1'],
        }));
        if (transactions.length === 0) {
            enqueueErrorSnackbar('The file does not contain any transactions, please upload the correct file.');
        } else {
            processTransactions(transactions, onClose, setOpenCreateTransactionsDialog);
        }
    }

    const handleTransactionsUpload = () => {
        if (uploadSettings.file) {
            Papa.parse(uploadSettings.file, {
                header: true,
                skipEmptyLines: true,
                complete: handleTransactionsComplete,
            });
        } else {
            enqueueErrorSnackbar('Please select a file.');
        }
    }

    const inputChanged = event => {
        let newInput = event.target.value;
        if (event.target.name === 'file') {
            newInput = event.target.files[0];
        }
        setUploadSettings(prevState => ({
            ...prevState,
            [event.target.name]: newInput,
        }));
    }

    return (
        <InputDialogTemplate
            maxWidth={maxWidth}
            open={open}
            onClose={onClose}
            titleIcon={<Receipt />}
            titleText='Upload Transactions'
            content={
                <UploadTransactionsDialogContent
                    inputChanged={inputChanged}
                />
            }
            action={handleTransactionsUpload}
            actionText='Upload'
            actionWidth='30%'
        />
    )
}

export default UploadTransactionsDialog;
