import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import BankAccountOverviewWidget from "./bankAccountOverviewWidget/bankAccountOverviewWidget";
import BankAccountInfoWidget from "./bankAccountInfoWidget/bankAccountInfoWidget";
import BankContext from "../contexts/BankContext";

function BankAccount() {
    const { id } = useParams();
    const { getBankAccount } = useContext(BankContext);

    useEffect(() => {
        getBankAccount(id);
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box
            style={{
                maxHeight: '95vh',
                overflow: 'auto',
            }}
        >
            <Grid container spacing={3} pl={30} pt={5} pr={5}>
                <Grid
                    item
                    xs={9}
                >
                    <BankAccountOverviewWidget />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <BankAccountInfoWidget />
                </Grid>
            </Grid>
        </Box>
    );
}

export default BankAccount;
