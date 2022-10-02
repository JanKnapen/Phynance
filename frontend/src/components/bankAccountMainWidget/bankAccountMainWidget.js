import {useContext, useEffect, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import Grid from "@mui/material/Grid";
import ButtonSelector from "../../utils/buttonSelector";
import TransactionsTable from "../transactionsTable/transactionsTable";
import BankContext from "../../contexts/BankContext";

function BankAccountMainWidget() {
    const { theme } = useContext(CustomThemeContext);
    const {
        bankAccount,
        getTransactions,
        transactions,
    } = useContext(BankContext);
    const periodOptions = ['month', 'year'];
    const [period, setPeriod] = useState(periodOptions[0]);
    const overviewOptions = ['transactions'];
    const [overview, setOverview] = useState(overviewOptions[0]);

    useEffect(() => {
        if (bankAccount.id != null) {
            getTransactions({
                bankAccountId: bankAccount.id,
                period: period,
            });
        }
    }, [bankAccount.id])

    useEffect(() => {
        if (bankAccount.id != null) {
            getTransactions({
                bankAccountId: bankAccount.id,
                period: period,
            });
        }
    }, [period]);

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
                width: '100%',
            }}
        >
            <Grid
                container
                padding={5}
            >
                <Grid item xs={1}>
                    <ButtonSelector
                        options={overviewOptions}
                        currentOption={overview}
                        setCurrentOption={setOverview}
                    />
                </Grid>
                <Grid item xs={10}/>
                <Grid item xs={1}>
                    <ButtonSelector
                        options={periodOptions}
                        currentOption={period}
                        setCurrentOption={setPeriod}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TransactionsTable
                        editable={false}
                        transactions={transactions}
                        minHeight='60vh'
                        maxHeight='60vh'
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default BankAccountMainWidget;
