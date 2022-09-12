import {useState} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login({ setAuthenticatedCredentials }) {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const login = event => {
        axios.post('http://localhost:8000/auth/login/', credentials)
            .then(response => {
                setAuthenticatedCredentials({
                    ...credentials,
                    token: response.data.token,
                });
                navigate('/home');
            })
            .catch(error => {
                console.error(error.message)
            });
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
        <div className="App">
            <h1>Login Page</h1>
            <TextField
                id="username-textfield"
                label="Username"
                name="username"
                variant="standard"
                required={true}
                onChange={inputChanged}
                onKeyDown={keyPress}
            />
            <br/>
            <br/>
            <TextField
                id="password-textfield"
                label="Password"
                name="password"
                type="password"
                variant="standard"
                required={true}
                onChange={inputChanged}
                onKeyDown={keyPress}
            />
            <br/>
            <br/>
            <Button
                variant="contained"
                onClick={login}
            >Login</Button>
        </div>
    );
}

export default Login;
