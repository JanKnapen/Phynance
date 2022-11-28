import {useContext} from "react";
import BankContext from "../../../contexts/BankContext";
import TransactionsTablev2 from "../../transactionsTable/transactionsTablev2";

function CreateTransactionsDialogContent() {
    const {
        processedTransactions,
        setProcessedTransactions,
    } = useContext(BankContext);

    return (
        <TransactionsTablev2
            transactions={processedTransactions}
            setTransactions={setProcessedTransactions}
        />
    )
}

export default CreateTransactionsDialogContent;
