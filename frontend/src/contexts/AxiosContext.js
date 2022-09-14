import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AxiosContext = createContext(null);

export default AxiosContext;

export const AxiosProvider = ({children}) => {
    const navigate = useNavigate();

    const [authUser, setAuthUser] = useState(() =>
        localStorage.getItem('authUserPhynance')
            ? JSON.parse(localStorage.getItem('authUserPhynance'))
            : {
                username: null,
                authToken: null,
            }
    );

    const axiosClient = axios.create();
    axiosClient.defaults.baseURL = 'http://localhost:8000/';
    axiosClient.defaults.timeout = 2000;

    axiosClient.interceptors.response.use(
        function(response) {
            return response;
        },
        function(error) {
            if (error.message.status === 401) {
                setAuthUser({
                    username: null,
                    authToken: null,
                });
                localStorage.removeItem('authUserPhynance');
                navigate('/login');
            }
            console.error('Looks like there was a problem. Status Code: ' + error.message.status);
            return Promise.reject(error);
        }
    )

    const loginUserRequest = async ({
                                        username,
                                        password,
                                    }, handleResponse, handleError) => {
        const postData = {
            username: username,
            password: password,
        }
        axiosClient.post('/auth/login/', postData)
            .then(response => handleResponse(response))
            .catch(error => handleError(error));
    }

    const registerUserRequest = async ({
                                           username,
                                           password,
                                       }, handleResponse, handleError) => {
        const postData = {
            username: username,
            password: password,
        }
        axiosClient.post('/auth/users/', postData)
            .then(response => handleResponse(response))
            .catch(error => handleError(error));
    }

    const contextData = {
        authUser,
        setAuthUser,
        loginUserRequest,
        registerUserRequest,
    };

    return (
        <AxiosContext.Provider value={contextData}>
            {children}
        </AxiosContext.Provider>
    );
};