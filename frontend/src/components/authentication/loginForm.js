import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import {useContext, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import CustomThemeContext from "../../contexts/CustomThemeProvider";

function LoginForm() {
    const {theme} = useContext(CustomThemeContext);
    const {loginUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const login = () => {
        loginUser(credentials.username, credentials.password);
    }

    const inputChanged = event => {
        setCredentials(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const keyPress = event => {
        if (event.keyCode === 13) {
            login(event);
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
                        Sign in to Phynance
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={login}
                        >
                            Sign In
                        </Button>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                New to Phynance?
                            </div>
                            <div
                                style={theme.palette.link_div}
                                onClick={() => navigate('/register')}
                            >
                                Create an account
                            </div>
                        </div>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;
