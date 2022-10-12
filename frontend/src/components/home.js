import Grid from '@mui/material/Grid';
import BankAccountsWidget from "./bankAccountWidget/bankAccountsWidget";

function Home() {
    return (
        <Grid container spacing={3} pl={30} pt={5} pr={5}>
            <Grid item xs={6}>
                <BankAccountsWidget/>
            </Grid>
        </Grid>
    );
}

export default Home;
