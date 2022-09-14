import Grid from '@mui/material/Grid';
import BankAccountsWidget from "./addBankAccountWidget/bankAccountsWidget";
import {useEffect, useState} from "react";

function Home() {
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(() => {
        setBankAccounts([]);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid container spacing={3} pl={30} pt={5} pr={5}>
            <Grid item xs={6}>
                <BankAccountsWidget bankAccounts={bankAccounts}/>
            </Grid>
        </Grid>
    );
}

export default Home;
