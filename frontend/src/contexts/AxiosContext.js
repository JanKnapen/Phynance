import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AxiosContext = createContext(null);

export default AxiosContext;

export const AxiosProvider = ({children}) => {
    const navigate = useNavigate();

    const [authUser, setAuthUser] = useState(() =>
        sessionStorage.getItem('authUserPhynance')
            ? JSON.parse(sessionStorage.getItem('authUserPhynance'))
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
                sessionStorage.removeItem('authUserPhynance');
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

    const getRequest = (url, handleResponse, handleError) => {
        axiosClient.get(url, {
            headers: {
                'Authorization': `token ${authUser.authToken}`,
            },
        })
            .then(response => handleResponse(response))
            .catch(error => handleError(error));
    }

    const postRequest = (url, data, handleResponse, handleError) => {
        axiosClient.post(url, data, {
            headers: {
                'Authorization': `token ${authUser.authToken}`,
            },
        })
            .then(response => handleResponse(response))
            .catch(error => handleError(error));
    }

    const createBankAccountRequest = async ({
                                                name,
                                                description,
                                                IBAN,
                                            }, handleResponse, handleError) => {
        const postData = {
            name: name,
            description: description,
            IBAN: IBAN,
        }
        postRequest('/bank/accounts/', postData, handleResponse, handleError);
    }

    const contextData = {
        authUser,
        setAuthUser,
        loginUserRequest,
        registerUserRequest,
        createBankAccountRequest,
    };

    return (
        <AxiosContext.Provider value={contextData}>
            {children}
        </AxiosContext.Provider>
    );
};