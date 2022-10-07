import Grid from "@mui/material/Grid";
import {Divider, Typography} from "@mui/material";
import {useContext} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import BankContext from "../../contexts/BankContext";

function BankAccountInfo() {
    const {theme} = useContext(CustomThemeContext);
    const {bankAccount} = useContext(BankContext);

    return (
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
                    {bankAccount ? bankAccount.currencyFormatter.format(bankAccount.balance) : ''}
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
                <Divider/>
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
                    {bankAccount ? bankAccount.name : ''}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Divider/>
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
                    {bankAccount ? bankAccount.description : ''}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                paddingBottom={2.5}
            >
                <Divider/>
            </Grid>
        </Grid>
    )
}

export default BankAccountInfo;
