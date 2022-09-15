import {AuthProvider} from "./contexts/AuthContext";
import {AxiosProvider} from "./contexts/AxiosContext";
import {BankProvider} from "./contexts/BankContext";
import {UtilsProvider} from "./contexts/UtilsContext";
import {SnackbarProvider} from "notistack";
import {NotificationsProvider} from "./contexts/NotificationsContext";

function Contexts({children}) {
    return (
        <SnackbarProvider maxSnack={5}>
            <NotificationsProvider>
                <AxiosProvider>
                    <AuthProvider>
                        <BankProvider>
                            <UtilsProvider>
                                {children}
                            </UtilsProvider>
                        </BankProvider>
                    </AuthProvider>
                </AxiosProvider>
            </NotificationsProvider>
        </SnackbarProvider>
    )
};

export default Contexts;
