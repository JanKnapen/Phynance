import Grid from "@mui/material/Grid";
import {Button, Typography} from "@mui/material";
import {useContext, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import BankContext from "../../contexts/BankContext";

function BankAccountOverviewWidget() {
    const { theme } = useContext(CustomThemeContext);
    const { bankAccount } = useContext(BankContext);
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: bankAccount ? bankAccount.currency : 'EUR',
    });
    const [period, setPeriod] = useState('month');

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
                width: '100%',
            }}
        >
            <Grid container
                  pt={5}
                  pl={5}
                  pb={5}
                  pr={5}
            >
                <Grid item xs={11}>
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
                <Grid item xs={1}>
                    <Button
                        variant={period === 'year' ? 'contained' : 'text'}
                        disabled={period === 'year'}
                        style={{
                            float: 'left',
                            width: '40%',
                        }}
                        onClick={() => setPeriod('year')}
                    >
                        Year
                    </Button>
                    <Button
                        variant={period === 'month' ? 'contained' : 'text'}
                        disabled={period === 'month'}
                        style={{
                            float: 'right',
                            width: '40%',
                        }}
                        onClick={() => setPeriod('month')}
                    >
                        Month
                    </Button>
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
                        {bankAccount != null ? currencyFormatter.format(bankAccount.expenses[period]) : null}
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
                        {bankAccount != null ? currencyFormatter.format(bankAccount.income[period]) : null}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default BankAccountOverviewWidget;
