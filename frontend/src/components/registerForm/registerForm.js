import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import { useState} from "react";
import {useNavigate} from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const register = event => {
        //TODO: register
        navigate('/login');
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
                <CssBaseline />
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
                    <Box noValidate sx={{ mt: 1 }}>
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
                          sx={{ mt: 3, mb: 2 }}
                          onClick={register}
                        >
                          Create Account
                        </Button>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                Already have an account?
                            </div>
                            <div
                                style={{
                                    color: '#3366CC',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={event => navigate('/login')}
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
