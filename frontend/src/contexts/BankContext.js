import {createContext, useContext, useState} from "react";
import AxiosContext from "./AxiosContext";
import NotificationsContext from "./NotificationsContext";

const BankContext = createContext(null);

export default BankContext;

export const BankProvider = ({children}) => {
    const { enqueueErrorSnackbar } = useContext(NotificationsContext);
    const {
        getBankAccountsInfoRequest,
        getBankAccountRequest,
        getCategoriesRequest,
        processTransactionsRequest,
        getTransactionsRequest,
    } = useContext(AxiosContext);
    const [bankAccountsInfo, setBankAccountsInfo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bankAccount, setBankAccount] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [processedTransactions, setProcessedTransactions] = useState([]);

    const getBankAccountsInfo = () => {
        const handleResponse = (response) => {
            setBankAccountsInfo(response.data);
        }
        const handleError = (error) => {
            enqueueErrorSnackbar('Unable to load your bank accounts, eload to try again.')
        }
        getBankAccountsInfoRequest(handleResponse, handleError);
    }

    const getCategories = () => {
        const handleResponse = (response) => {
            setCategories(response.data);
        }
        const handleError = (error) => {
            enqueueErrorSnackbar('Unable to load your categories, reload to try again.')
        }
        getCategoriesRequest(handleResponse, handleError);
    }

    const getBankAccount = (id) => {
        const handleResponse = (response) => {
            setBankAccount(response.data);
        }
        const handleError = (error) => {
            enqueueErrorSnackbar('Unable to load bank account, reload to try again.');
        }
        getBankAccountRequest(id, handleResponse, handleError);
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
        const handleError = (error) => {
            enqueueErrorSnackbar('Unable to process uploaded transactions.');
        }
        processTransactionsRequest(transactions, handleResponse, handleError);
    }

    const getTransactions = ({ bankAccountId, period, dateRange }, debug) => {
        if (period === 'custom' && dateRange == null) return;
        const handleResponse = (response) => {
            setTransactions(response.data);
        }
        const handleError = (error) => {
            enqueueErrorSnackbar('Unable to load transactions for the selected period, reload to try again.');
        }
        getTransactionsRequest({ bankAccountId, period, dateRange }, handleResponse, handleError);
    }

    const contextData = {
        bankAccountsInfo,
        getBankAccountsInfo,
        categories,
        getCategories,
        bankAccount,
        getBankAccount,
        processTransactions,
        processedTransactions,
        setProcessedTransactions,
        getTransactions,
        transactions,
    };

    return (
        <BankContext.Provider value={contextData}>
            {children}
        </BankContext.Provider>
    );
};