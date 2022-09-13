import Grid from '@mui/material/Grid';
import BankAccountsWidget from "./bankAccountsWidget";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

function Home() {
    const { authTokens } = useContext(AuthContext);
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/bank_portfolio/bank_accounts/', {
            headers: {
                'Authorization': `token ${authTokens.token}`,
            },
        })
            .then(response => {
                setBankAccounts(response.data);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid container spacing={3} pl={30} pt={5} pr={5}>
            <Grid item xs={6}>
                <BankAccountsWidget bankAccounts={bankAccounts}/>
            </Grid>
            <Grid item xs={6}>
                <BankAccountsWidget bankAccounts={[]}/>
            </Grid>
        </Grid>
    );
}

export default Home;
