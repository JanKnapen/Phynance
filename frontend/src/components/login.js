import {useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import AuthContext from "../contexts/AuthContext";

function Login() {
    const { loginUser } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const login = event => {
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
