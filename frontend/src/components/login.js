import Grid from "@mui/material/Grid";
import LoginForm from "./authentication/loginForm";

function Login() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '70vh' }}
        >
            <Grid item xs={3}>
                <LoginForm />
            </Grid>
        </Grid>
    );
}

export default Login;
