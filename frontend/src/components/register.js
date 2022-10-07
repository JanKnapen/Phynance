import Grid from "@mui/material/Grid";
import RegisterForm from "./authentication/registerForm";

function Register() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '70vh'}}
        >
            <Grid item xs={3}>
                <RegisterForm/>
            </Grid>
        </Grid>
    );
}

export default Register;
