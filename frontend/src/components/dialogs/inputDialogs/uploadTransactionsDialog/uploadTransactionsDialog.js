import {Dialog} from "@mui/material";
import Papa from "papaparse";
import {useContext, useState} from "react";
import BankContext from "../../../../contexts/BankContext";
import InputDialogTemplateTitle from "../inputDialogTemplateTitle";
import {Receipt} from "@mui/icons-material";
import InputDialogTemplateContent from "../inputDialogTemplateContent";
import UploadTransactionsDialogContent from "./uploadTransactionsDialogContent";
import InputDialogTemplateActions from "../inputDialogTemplateActions";

function UploadTransactionsDialog({ open, onClose, maxWidth }) {
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
        const transactions = results.data.map((row) => ({
            bank_account: bankAccount.id,
            date: new Date(row['Datum']),
            amount: parseFloat(row['Bedrag']),
            serial_number: parseInt(row['Volgnr']),
            counter_party_IBAN: row['Tegenrekening IBAN/BBAN'],
            counter_party_name: row['Naam tegenpartij'],
            balance_after: parseFloat(row['Saldo na trn']),
            description: row['Omschrijving-1'],
        }));
        processTransactions(transactions);
    }

    const handleTransactionsUpload = () => {
        if (uploadSettings.file) {
            Papa.parse(uploadSettings.file, {
                header: true,
                skipEmptyLines: true,
                complete: handleTransactionsComplete,
            });
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
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={maxWidth}
        >
            <InputDialogTemplateTitle
                onClose={onClose}
                titleIcon={<Receipt />}
                titleText='Upload Transactions'
            />
            <InputDialogTemplateContent
                content={
                    <UploadTransactionsDialogContent
                        inputChanged={inputChanged}
                    />
                }
            />
            <InputDialogTemplateActions
                actionWidth='30%'
                action={handleTransactionsUpload}
                actionText='Upload'
            />
        </Dialog>
    )
}

export default UploadTransactionsDialog;
