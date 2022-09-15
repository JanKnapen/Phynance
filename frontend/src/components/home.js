import Grid from '@mui/material/Grid';
import BankAccountsWidget from "./bankAccountWidget/bankAccountsWidget";
import {useContext, useEffect} from "react";
import BankContext from "../contexts/BankContext";

function Home() {
    const { getBankAccountsInfo } = useContext(BankContext);

    useEffect(() => {
        getBankAccountsInfo();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid container spacing={3} pl={30} pt={5} pr={5}>
            <Grid item xs={6}>
                <BankAccountsWidget />
            </Grid>
        </Grid>
    );
}

export default Home;
