import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";
import AxiosContext from "./AxiosContext";
import NotificationsContext from "./NotificationsContext";

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({children}) => {
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useContext(NotificationsContext);
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
            setAuthUser({
                username: username,
                authToken: response.data.token,
            })
            sessionStorage.setItem('authUserPhynance', JSON.stringify({
                username: username,
                authToken: response.data.token,
            }))
            navigate("/home");
        }
        const handleError = (error) => {
            enqueueErrorSnackbar("Combination of username & password doesn't exist");
        }

        loginUserRequest(postData, handleResponse, handleError);
    };

    const registerUser = async (username, password) => {
        const postData = {
            username: username,
            password: password,
        }
        const handleResponse = (response) => {
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