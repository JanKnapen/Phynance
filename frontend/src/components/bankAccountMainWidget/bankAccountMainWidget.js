import {useContext, useEffect, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import Grid from "@mui/material/Grid";
import ButtonSelector from "../../utils/buttonSelector";
import TransactionsTable from "../transactionsTable/transactionsTable";
import BankContext from "../../contexts/BankContext";
import PeriodSelector from "../../utils/periodSelector";

function BankAccountMainWidget() {
    const {theme} = useContext(CustomThemeContext);
    const {
        bankAccount,
        getTransactions,
        transactions,
    } = useContext(BankContext);
    const [period, setPeriod] = useState(null);
    const overviewOptions = [
        {
            name: 'transactions',
            disable: true,
            onClick: () => setOverview('transactions'),
        }
    ];
    const [overview, setOverview] = useState(overviewOptions[0].name);

    useEffect(() => {
        setPeriod('month');
        setOverview('transactions');
        if (bankAccount.id != null && period != null) {
            getTransactions({
                bankAccountId: bankAccount.id,
                period: period,
            });
        }
    }, [bankAccount.id]); // eslint-disable-line react-hooks/exhaustive-deps

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
                <Grid item xs={9}/>
                <Grid item xs={2}>
                    <PeriodSelector
                        period={period}
                        setPeriod={setPeriod}
                        action={(period, dateRange) => {
                            if (bankAccount.id != null) {
                                getTransactions({
                                    bankAccountId: bankAccount.id,
                                    period: period,
                                    dateRange: dateRange,
                                });
                            }
                        }}
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
