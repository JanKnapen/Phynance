import {createContext, useContext, useState} from "react";
import AxiosContext from "./AxiosContext";

const BankContext = createContext(null);

export default BankContext;

export const BankProvider = ({children}) => {
    const { getBankAccountsInfoRequest } = useContext(AxiosContext);
    const [bankAccountsInfo, setBankAccountsInfo] = useState([]);

    const getBankAccountsInfo = () => {
        const handleResponse = (response) => {
            setBankAccountsInfo(response.data);
        }
        const handleError = (error) => {
            //TODO: notification
        }
        getBankAccountsInfoRequest(handleResponse, handleError);
    }

    const contextData = {
        bankAccountsInfo,
        getBankAccountsInfo,
    };

    return (
        <BankContext.Provider value={contextData}>
            {children}
        </BankContext.Provider>
    );
};