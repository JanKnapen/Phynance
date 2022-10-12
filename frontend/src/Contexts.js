import {AuthProvider} from "./contexts/AuthContext";
import {AxiosProvider} from "./contexts/AxiosContext";
import {BankProvider} from "./contexts/BankContext";
import {UtilsProvider} from "./contexts/UtilsContext";
import {SnackbarProvider} from "notistack";
import {NotificationsProvider} from "./contexts/NotificationsContext";
import {CustomThemeProvider} from "./contexts/CustomThemeProvider";

function Contexts({children}) {
    return (
        <CustomThemeProvider>
            <SnackbarProvider maxSnack={5}>
                <NotificationsProvider>
                    <AxiosProvider>
                        <AuthProvider>
                            <UtilsProvider>
                                <BankProvider>
                                        {children}
                                </BankProvider>
                            </UtilsProvider>
                        </AuthProvider>
                    </AxiosProvider>
                </NotificationsProvider>
            </SnackbarProvider>
        </CustomThemeProvider>
    )
}

export default Contexts;
