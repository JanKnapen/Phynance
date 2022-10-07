import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import {useContext, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import BankContext from "../../contexts/BankContext";
import PeriodSelector from "../../utils/periodSelector";

function BankAccountOverviewWidget() {
    const {theme} = useContext(CustomThemeContext);
    const {
        bankAccount,
        getOverviewPeriod,
    } = useContext(BankContext);
    const [period, setPeriod] = useState(null);

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
                width: '100%',
            }}
        >
            <Grid container
                  padding={5}
            >
                <Grid item xs={10}>
                    <Typography
                        variant='h4'
                        style={{
                            float: 'left',
                            fontWeight: 'bold',
                            color: theme.palette.text.darkBlue,
                        }}
                    >
                        Overview
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <PeriodSelector
                        period={period}
                        setPeriod={setPeriod}
                        action={(period, dateRange) => {
                            if (bankAccount.id != null && period === 'custom') {
                                getOverviewPeriod({
                                    bankAccountId: bankAccount.id,
                                    dateRange: dateRange,
                                });
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography
                        variant='h5'
                        style={{
                            float: 'left',
                            fontWeight: 'bold',
                            color: theme.palette.text.light,
                        }}
                    >
                        Expenses:
                    </Typography>
                    <Typography
                        variant='h5'
                        style={{
                            float: 'right',
                            fontWeight: 'bold',
                        }}
                    >
                        {bankAccount.expenses != null ? bankAccount.currencyFormatter.format(bankAccount.expenses[period]) : null}
                    </Typography>
                    <br/>
                    <Typography
                        variant='h5'
                        style={{
                            float: 'left',
                            fontWeight: 'bold',
                            color: theme.palette.text.light,
                        }}
                    >
                        Income:
                    </Typography>
                    <Typography
                        variant='h5'
                        style={{
                            float: 'right',
                            fontWeight: 'bold',
                        }}
                    >
                        {bankAccount.income != null ? bankAccount.currencyFormatter.format(bankAccount.income[period]) : null}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default BankAccountOverviewWidget;
