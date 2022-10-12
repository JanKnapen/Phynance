import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";
import AxiosContext from "./AxiosContext";
import NotificationsContext from "./NotificationsContext";
import BankContext from "./BankContext";

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({children}) => {
    const {enqueueErrorSnackbar, enqueueSuccessSnackbar} = useContext(NotificationsContext);
    const {
        getBankAccountsInfo,
        resetBankAccountsInfo,
    } = useContext(BankContext);
    const {
        setAuthUser,
        loginUserRequest,
        registerUserRequest,
    } = useContext(AxiosContext);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const postData = {
            username: username,
            password: password,
        }
        const handleResponse = (response) => {
            const newAuthUser = {
                username: username,
                authToken: response.data.token,
            }
            setAuthUser(newAuthUser);
            sessionStorage.setItem('authUserPhynance', JSON.stringify(newAuthUser))
            getBankAccountsInfo(newAuthUser);
            navigate("/home");
        }
        const handleError = () => {
            enqueueErrorSnackbar("Combination of username & password doesn't exist");
        }

        loginUserRequest(postData, handleResponse, handleError);
    };

    const registerUser = async (username, password) => {
        const postData = {
            username: username,
            password: password,
        }
        const handleResponse = () => {
            enqueueSuccessSnackbar('Successfully created account!');
            navigate("/login");
        }
        const handleError = (error) => {
            if (error.response.status === 400) {
                enqueueErrorSnackbar('Username already exists');
            }
        }

        registerUserRequest(postData, handleResponse, handleError);
    }

    const logoutUser = () => {
        setAuthUser({
            username: null,
            authToken: null,
        });
        sessionStorage.removeItem('authUserPhynance');
        resetBankAccountsInfo();
        navigate("/login");
    };

    const contextData = {
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};