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
        function (response) {
            return response;
        },
        function (error) {
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

    const putRequest = (url, data, handleResponse, handleError) => {
        axiosClient.put(url, data, {
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
                                                currency,
                                            }, handleResponse, handleError) => {
        const postData = {
            name: name,
            description: description,
            IBAN: IBAN,
            currency: currency,
        }
        postRequest('/bank/accounts/', postData, handleResponse, handleError);
    }

    const getBankAccountsInfoRequest = async (handleResponse, handleError) => {
        getRequest('/bank/accounts/info/', handleResponse, handleError);
    }

    const getBankAccountRequest = async (id, handleResponse, handleError) => {
        getRequest('/bank/accounts/' + id + '/', handleResponse, handleError);
    }

    const createCategoryRequest = async ({
                                             name,
                                             description,
                                             icon,
                                         }, handleResponse, handleError) => {

        const postData = {
            name: name,
            description: description,
            icon: icon,
        }
        postRequest('/bank/categories/', postData, handleResponse, handleError);
    }

    const updateCategoryRequest = async ({
                                             id,
                                             name,
                                             description,
                                             icon,
                                         }, handleResponse, handleError) => {
        const putData = {
            name: name,
            description: description,
            icon: icon,
        }
        putRequest('/bank/categories/' + id + '/', putData, handleResponse, handleError);
    }

    const getCategoriesRequest = async (handleResponse, handleError) => {
        getRequest('/bank/categories/', handleResponse, handleError);
    }

    const getMUIIconsRequest = async (handleResponse, handleError) => {
        getRequest('/utils/mui_icons/', handleResponse, handleError);
    }

    const processTransactionsRequest = async (transactions, handleResponse, handleError) => {
        postRequest('/bank/transactions/process/', transactions, handleResponse, handleError);
    }

    const createTransactionsRequest = async (transactions, handleResponse, handleError) => {
        postRequest('/bank/transactions/', transactions, handleResponse, handleError);
    }

    const getTransactionsRequest = async ({
                                              bankAccountId,
                                              period,
                                              dateRange,
                                          }, handleResponse, handleError) => {
        const postData = {
            period: period,
            dateRange: dateRange != null ? {
                startDate: dateRange.startDate.format('YYYY/MM/DD'),
                endDate: dateRange.endDate.format('YYYY/MM/DD'),
            } : null,
        }
        postRequest('/bank/accounts/' + bankAccountId + '/transactions/period/', postData, handleResponse, handleError);
    }

    const contextData = {
        authUser,
        setAuthUser,
        loginUserRequest,
        registerUserRequest,
        createBankAccountRequest,
        getBankAccountsInfoRequest,
        getBankAccountRequest,
        createCategoryRequest,
        updateCategoryRequest,
        getCategoriesRequest,
        getMUIIconsRequest,
        processTransactionsRequest,
        createTransactionsRequest,
        getTransactionsRequest,
    };

    return (
        <AxiosContext.Provider value={contextData}>
            {children}
        </AxiosContext.Provider>
    );
};