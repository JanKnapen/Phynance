import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import {useContext, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import BankContext from "../../contexts/BankContext";
import ButtonSelector from "../../utils/buttonSelector";

function BankAccountOverviewWidget() {
    const {theme} = useContext(CustomThemeContext);
    const {bankAccount} = useContext(BankContext);
    const periodOptions = [
        {
            name: 'month',
            disable: true,
            onClick: () => setPeriod('month'),
        },
        {
            name: 'year',
            disable: true,
            onClick: () => setPeriod('year'),
        }
    ];
    const [period, setPeriod] = useState(periodOptions[0].name);

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
                    <ButtonSelector
                        options={periodOptions}
                        currentOption={period}
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
