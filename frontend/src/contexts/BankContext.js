import {createContext, useContext, useEffect, useState} from "react";
import AxiosContext from "./AxiosContext";
import NotificationsContext from "./NotificationsContext";
import UtilsContext from "./UtilsContext";
import {useNavigate} from "react-router-dom";

const BankContext = createContext(null);

export default BankContext;

export const BankProvider = ({children}) => {
    const navigate = useNavigate();
    const {
        enqueueErrorSnackbar,
        enqueueSuccessSnackbar,
    } = useContext(NotificationsContext);
    const {
        handleSaveRequestError,
        currencies,
    } = useContext(UtilsContext);
    const {
        authUser,
        createBankAccountRequest,
        getBankAccountsInfoRequest,
        getBankAccountRequest,
        deleteBankAccountRequest,
        getCategoriesRequest,
        processTransactionsRequest,
        getTransactionsRequest,
        getOverviewPeriodRequest,
    } = useContext(AxiosContext);
    const [bankAccountsInfo, setBankAccountsInfo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bankAccount, setBankAccount] = useState({
        currencyFormatter: null,
    });
    const [transactions, setTransactions] = useState([]);
    const [processedTransactions, setProcessedTransactions] = useState([]);
    const [paymentRequests, setPaymentRequests] = useState([]);

    const getBankAccountsInfo = (newAuthUser) => {
        const handleResponse = (response) => {
            setBankAccountsInfo(response.data);
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to load your bank accounts, reload to try again.')
        }
        getBankAccountsInfoRequest(handleResponse, handleError, newAuthUser);
    }

    const createBankAccount = (newBankAccount, setNewBankAccount, onClose) => {
        newBankAccount = {
            ...newBankAccount,
            currency: newBankAccount.currency.id,
        }
        const handleResponse = () => {
            enqueueSuccessSnackbar('Successfully created bank account!');
            setNewBankAccount({
                name: null,
                description: null,
                IBAN: null,
                currency: currencies[0],
            });
            getBankAccountsInfo();
            onClose();
        }
        const handleError = (error) => {
            handleSaveRequestError(error, 'bank account');
        }

        createBankAccountRequest(newBankAccount, handleResponse, handleError);
    }

    const resetBankAccountsInfo = () => {
        setBankAccountsInfo([]);
    }

    const addCategory = (category) => {
        setCategories(prevCategories => [
            ...prevCategories,
            category,
        ]);
    }

    const updateCategory = (updateCategory) => {
        setCategories(prevCategories => prevCategories.map(category => {
            if (category.id === updateCategory.id) {
                return updateCategory;
            }
            return category;
        }))
    }

    const getCategories = (newAuthUser) => {
        const handleResponse = (response) => {
            setCategories(response.data);
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to load your categories, reload to try again.')
        }
        getCategoriesRequest(handleResponse, handleError, newAuthUser);
    }

    const resetCategories = () => {
        setCategories([]);
    }

    const getBankAccount = (id) => {
        const handleResponse = (response) => {
            setBankAccount(prevBankAccount => ({
                ...prevBankAccount,
                ...response.data,
                currencyFormatter: new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: response.data.currency.symbol,
                }),
            }));
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to load bank account, reload to try again.');
        }
        getBankAccountRequest(id, handleResponse, handleError);
    }

    const deleteBankAccount = (onClose) => {
        const handleResponse = () => {
            enqueueSuccessSnackbar('Successfully deleted bank account!');
            setBankAccountsInfo(bankAccountsInfo.filter(obj => obj.id !== bankAccount.id));
            setBankAccount({
                currencyFormatter: null,
            });
            navigate('/home');
            onClose();
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to delete bank account, please try again.');
        }

        deleteBankAccountRequest(bankAccount.id, handleResponse, handleError);
    }

    const processTransactions = (transactions, closeUploadTransactionsDialog, setOpenCreateTransactionsDialog) => {
        const handleResponse = (response) => {
            if (response.data.length === 0) {
                enqueueErrorSnackbar('All transactions already have been upload.');
            } else {
                setProcessedTransactions(response.data);
                getCategories();
                closeUploadTransactionsDialog();
                setOpenCreateTransactionsDialog(true);
            }
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to process uploaded transactions.');
        }
        processTransactionsRequest(transactions, handleResponse, handleError);
    }

    const getTransactions = ({bankAccountId, period, dateRange}) => {
        if (period === 'custom' && dateRange == null) return;
        const handleResponse = (response) => {
            setTransactions(response.data);
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to load transactions for the selected period, reload to try again.');
        }
        getTransactionsRequest({bankAccountId, period, dateRange}, handleResponse, handleError);
    }

    const getOverviewPeriod = ({bankAccountId, dateRange}) => {
        if (dateRange == null) return;
        const handleResponse = (response) => {
            setBankAccount(prevBankAccount => {
                return ({
                    ...prevBankAccount,
                    expenses: {
                        ...prevBankAccount.expenses,
                        'custom': response.data.expenses.custom,
                    },
                    income: {
                        ...prevBankAccount.income,
                        'custom': response.data.income.custom,
                    },
                })
            });
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to load bank account overview for this period, reload to try again.');
        }
        getOverviewPeriodRequest({bankAccountId, dateRange}, handleResponse, handleError);
    }

    useEffect(() => {
        if (authUser.authToken) {
            getBankAccountsInfo();
            getCategories();
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const contextData = {
        bankAccountsInfo,
        createBankAccount,
        getBankAccountsInfo,
        resetBankAccountsInfo,
        categories,
        addCategory,
        updateCategory,
        getCategories,
        resetCategories,
        bankAccount,
        getBankAccount,
        deleteBankAccount,
        processTransactions,
        processedTransactions,
        setProcessedTransactions,
        paymentRequests,
        setPaymentRequests,
        getTransactions,
        transactions,
        getOverviewPeriod,
    };

    return (
        <BankContext.Provider value={contextData}>
            {children}
        </BankContext.Provider>
    );
};