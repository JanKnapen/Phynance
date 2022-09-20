import Grid from "@mui/material/Grid";
import {Divider, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";

function BankAccountInfo({ bank }) {
    const { theme } = useContext(CustomThemeContext);
    const [currencyFormatter, setCurrencyFormatter] = useState(new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    }));

    useEffect(() => {
        setCurrencyFormatter(new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: bank.currency,
        }));
    }, [bank.currency]);

    return(
        <Grid container>
            <Grid
                item
                xs={12}
                paddingBottom={5}
            >
                <Typography
                    variant='h5'
                    style={{
                        float: 'left',
                        fontWeight: 'bold',
                        color: theme.palette.text.light,
                    }}
                >
                    Balance
                </Typography>
                <Typography
                    variant='h5'
                    style={{
                        float: 'right',
                        fontWeight: 'bold',
                    }}
                >
                    {currencyFormatter.format(bank.balance)}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Typography
                    variant='h4'
                    style={{
                        float: 'left',
                        fontWeight: 'bold',
                        color: theme.palette.text.darkBlue,
                    }}
                >
                    Account Info
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Divider />
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Typography
                    variant='h5'
                    style={{
                        float: 'left',
                        fontWeight: 'bold',
                        color: theme.palette.text.light,
                    }}
                >
                    Name
                </Typography>
                <Typography
                    variant='h5'
                    style={{
                        float: 'right',
                        fontWeight: 'bold',
                    }}
                >
                    {bank.name}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Divider />
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Typography
                    variant='h5'
                    style={{
                        float: 'left',
                        fontWeight: 'bold',
                        color: theme.palette.text.light,
                    }}
                >
                    Description
                </Typography>
                <Typography
                    variant='h5'
                    style={{
                        maxWidth: '60%',
                        textAlign: 'left',
                        float: 'right',
                        fontWeight: 'bold',
                    }}
                >
                    {bank.description}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Divider />
            </Grid>
        </Grid>
    )
}

export default BankAccountInfo;
