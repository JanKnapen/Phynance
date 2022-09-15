import {createContext, useContext, useState} from "react";
import AxiosContext from "./AxiosContext";

const BankContext = createContext(null);

export default BankContext;

export const BankProvider = ({children}) => {
    const {
        getBankAccountsInfoRequest,
        getCategoriesRequest
    } = useContext(AxiosContext);
    const [bankAccountsInfo, setBankAccountsInfo] = useState([]);
    const [categories, setCategories] = useState([]);

    const getBankAccountsInfo = () => {
        const handleResponse = (response) => {
            setBankAccountsInfo(response.data);
        }
        const handleError = (error) => {
            //TODO: notification
        }
        getBankAccountsInfoRequest(handleResponse, handleError);
    }

    const getCategories = () => {
        const handleResponse = (response) => {
            setCategories(response.data);
        }
        const handleError = (error) => {
            //TODO: notification
        }
        getCategoriesRequest(handleResponse, handleError);
    }

    const contextData = {
        bankAccountsInfo,
        getBankAccountsInfo,
        categories,
        getCategories,
    };

    return (
        <BankContext.Provider value={contextData}>
            {children}
        </BankContext.Provider>
    );
};