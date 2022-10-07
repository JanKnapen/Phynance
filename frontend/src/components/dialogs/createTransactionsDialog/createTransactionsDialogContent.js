import {useContext} from "react";
import BankContext from "../../../contexts/BankContext";
import TransactionsTable from "../../transactionsTable/transactionsTable";

function CreateTransactionsDialogContent() {
    const {
        processedTransactions,
        setProcessedTransactions,
    } = useContext(BankContext);

    return (
        <TransactionsTable
            editable={true}
            transactions={processedTransactions}
            setTransactions={setProcessedTransactions}
            maxHeight={700}
        />
    )
}

export default CreateTransactionsDialogContent;
