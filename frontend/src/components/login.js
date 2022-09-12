import {Component} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";

//TODO: change component to function with react hooks
class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: '',
        },
    }

    login = event => {
        axios.post('http://localhost:8000/auth/login/', this.state.credentials)
            .then(response => console.log(response.data.token))
            .catch(error => console.error(error));
    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    keyPress = event => {
        if (event.keyCode === 13) {
            this.login(event);
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Login Page</h1>
                <TextField
                    id="username-textfield"
                    label="Username"
                    name="username"
                    variant="standard"
                    required={true}
                    onChange={this.inputChanged}
                    onKeyDown={this.keyPress}
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
                    onChange={this.inputChanged}
                    onKeyDown={this.keyPress}
                />
                <br/>
                <br/>
                <Button
                    variant="contained"
                    onClick={this.login}
                >Login</Button>
            </div>
        );
    }
}

export default Login;
