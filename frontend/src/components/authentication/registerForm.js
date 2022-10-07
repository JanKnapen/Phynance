import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import NotificationsContext from "../../contexts/NotificationsContext";
import CustomThemeContext from "../../contexts/CustomThemeProvider";

function RegisterForm() {
    const {theme} = useContext(CustomThemeContext);
    const {enqueueErrorSnackbar} = useContext(NotificationsContext);
    const {registerUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const register = () => {
        if (credentials.password === credentials.confirmPassword) {
            registerUser(credentials.username, credentials.password)
        } else {
            enqueueErrorSnackbar('Passwords do not match.');
        }
    }

    const inputChanged = event => {
        setCredentials(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const keyPress = event => {
        if (event.keyCode === 13) {
            register(event);
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                    >
                        Create an account for Phynance
                    </Typography>
                    <Box noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={inputChanged}
                            onKeyDown={keyPress}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={inputChanged}
                            onKeyDown={keyPress}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="New Password"
                            type="password"
                            onChange={inputChanged}
                            onKeyDown={keyPress}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={register}
                        >
                            Create Account
                        </Button>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                Already have an account?
                            </div>
                            <div
                                style={theme.palette.link_div}
                                onClick={() => navigate('/login')}
                            >
                                Sing in
                            </div>
                        </div>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default RegisterForm;
