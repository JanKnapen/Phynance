import {AuthProvider} from "./contexts/AuthContext";
import {AxiosProvider} from "./contexts/AxiosContext";
import {BankProvider} from "./contexts/BankContext";
import {UtilsProvider} from "./contexts/UtilsContext";

function Contexts({children}) {
    return (
        <AxiosProvider>
            <AuthProvider>
                <BankProvider>
                    <UtilsProvider>
                        {children}
                    </UtilsProvider>
                </BankProvider>
            </AuthProvider>
        </AxiosProvider>
    )
};

export default Contexts;
