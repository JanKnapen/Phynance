import {AuthProvider} from "./contexts/AuthContext";
import {AxiosProvider} from "./contexts/AxiosContext";
import {BankProvider} from "./contexts/BankContext";
import {UtilsProvider} from "./contexts/UtilsContext";
import {SnackbarProvider} from "notistack";
import {NotificationsProvider} from "./contexts/NotificationsContext";
import {createTheme, ThemeProvider} from "@mui/material";
import {createContext, useState} from "react";

export const ColorModeContext = createContext(null);

function Contexts({children}) {
    const [theme, setTheme] = useState(createTheme({
        palette: {
            mode: 'light',
        }
    }));

    const switchTheme = () => {
        setTheme(prevTheme => (createTheme({
            palette: {
                mode: prevTheme.palette.mode === 'light' ? 'dark' : 'light',
            }
        })));
    }

    return (
        <ColorModeContext.Provider value={{ switchTheme }}>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Contexts;
