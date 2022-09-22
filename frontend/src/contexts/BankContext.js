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
    } = useContext(AxiosContext);
    const [bankAccountsInfo, setBankAccountsInfo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bankAccount, setBankAccount] = useState(null);
    const [processedTransactions, setProcessedTransactions] = useState(null);

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

    const processTransactions = (transactions) => {
        const handleResponse = (response) => {
            setProcessedTransactions(response.data);
        }
        const handleError = (error) => {
            enqueueErrorSnackbar('Unable to process uploaded transactions.');
        }
        processTransactionsRequest(transactions, handleResponse, handleError);
    }

    const contextData = {
        bankAccountsInfo,
        getBankAccountsInfo,
        categories,
        getCategories,
        bankAccount,
        getBankAccount,
        processTransactions,
    };

    return (
        <BankContext.Provider value={contextData}>
            {children}
        </BankContext.Provider>
    );
};