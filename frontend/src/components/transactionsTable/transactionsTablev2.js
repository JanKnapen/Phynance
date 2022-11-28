import Grid from "@mui/material/Grid";
import TransactionsTableHeader from "./transactionsTableHeader";
import TransactionsTableRow from "./transactionsTableRow";
import {Divider} from "@mui/material";
import TransactionsTableRowExtraOptions from "./transactionsTableRowExtraOptions";

function TransactionsTablev2({transactions, setTransactions}) {
    return (
        <Grid
            container
        >
            <TransactionsTableHeader/>
            {transactions.map(transaction => (
                <>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <TransactionsTableRow transaction={transaction} setTransactions={setTransactions}/>
                    <TransactionsTableRowExtraOptions transaction={transaction} setTransactions={setTransactions}/>
                </>
            ))}
        </Grid>
    )
}

export default TransactionsTablev2;
