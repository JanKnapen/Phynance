import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
    );
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const userCredentials = {
            username: username,
            password: password,
        }
        axios.post('http://localhost:8000/auth/login/', userCredentials)
            .then(response => {
                const authTokensData = {
                    token: response.data.token,
                }
                const userData = {
                    username: username,
                }
                setAuthTokens(authTokensData);
                setUser(userData);
                localStorage.setItem("authTokens", JSON.stringify(authTokensData));
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/home");
            })
            .catch(error => {
                setAlert(true);
                setAlertMessage("Combination of username & password doesn't exist");
                setAlertSeverity('error');
                setTimeout(() => setAlert(false), 2500);
            });
    };

    const registerUser = async (username, password) => {
        const userCredentials = {
            username: username,
            password: password,
        }
        axios.post('http://localhost:8000/auth/users/', userCredentials)
            .then(response => {
                setAlert(true);
                setAlertMessage('Successfully created account!');
                setAlertSeverity('success');
                setTimeout(() => setAlert(false), 2500);
                navigate("/login");
            })
            .catch(error => {
                if (error.response.status === 400) {
                    setAlert(true);
                    setAlertMessage('Username already exists');
                    setAlertSeverity('error');
                    setTimeout(() => setAlert(false), 2500);
                }
            });
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const contextData = {
        authTokens,
        user,
        setAuthTokens,
        loginUser,
        logoutUser,
        registerUser,
        alert,
        alertMessage,
        alertSeverity,
        setAlert,
        setAlertMessage,
        setAlertSeverity,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};