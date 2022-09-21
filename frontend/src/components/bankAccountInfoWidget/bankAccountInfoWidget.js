import {useContext} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import Grid from "@mui/material/Grid";
import BankAccountCardLogo from "./bankAccountCardLogo";
import {Button} from "@mui/material";
import BankAccountInfo from "./bankAccountInfo";
import BankContext from "../../contexts/BankContext";

function BankAccountInfoWidget() {
    const { theme } = useContext(CustomThemeContext);
    const { bankAccount } = useContext(BankContext);

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
            }}
        >
            <Grid container
                  pt={5}
                  pl={5}
                  pb={5}
                  pr={5}
            >
                <Grid item xs={12} paddingBottom={5}>
                    <BankAccountCardLogo
                        IBAN={bankAccount ? bankAccount.IBAN : ''}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    paddingLeft={3}
                    paddingRight={3}
                    paddingBottom={5}
                >
                    <BankAccountInfo currency={bankAccount ? bankAccount.currency : 'EUR'}/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        style={{
                            width: '60%',
                        }}
                    >
                        Upload Transactions
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default BankAccountInfoWidget;
