import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AxiosContext from "./AxiosContext";

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({children}) => {
    const {
        setAuthUser,
        loginUserRequest,
        registerUserRequest,
    } = useContext(AxiosContext);

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const postData = {
            username: username,
            password: password,
        }
        const handleResponse = (response) => {
            setAuthUser({
                username: username,
                authToken: response.data.token,
            })
            localStorage.setItem('authUserPhynance', JSON.stringify({
                username: username,
                authToken: response.data.token,
            }))
            navigate("/home");
        }
        const handleError = (error) => {
            setAlert(true);
            setAlertMessage("Combination of username & password doesn't exist");
            setAlertSeverity('error');
            setTimeout(() => setAlert(false), 2500);
        }

        loginUserRequest(postData, handleResponse, handleError);
    };

    const registerUser = async (username, password) => {
        const postData = {
            username: username,
            password: password,
        }
        const handleResponse = (response) => {
            setAlert(true);
            setAlertMessage('Successfully created account!');
            setAlertSeverity('success');
            setTimeout(() => setAlert(false), 2500);
            navigate("/login");
        }
        const handleError = (error) => {
            if (error.response.status === 400) {
                setAlert(true);
                setAlertMessage('Username already exists');
                setAlertSeverity('error');
                setTimeout(() => setAlert(false), 2500);
            }
        }

        registerUserRequest(postData, handleResponse, handleError);
    }

    const logoutUser = () => {
        setAuthUser({
            username: null,
            authToken: null,
        });
        localStorage.removeItem('authUserPhynance');
        navigate("/login");
    };

    const contextData = {
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