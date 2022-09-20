import {createContext, useState} from "react";
import {createTheme, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import Cookies from "universal-cookie/es6";

const CustomThemeContext = createContext(null);

export default CustomThemeContext;

export const CustomThemeProvider = ({children}) => {
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            text: {
                light: '#9e9e9e',
                darkBlue: '#7b1fa2',
            },
            sidebar: {
                menuHeader: 'lightgray',
                menuItem: 'white',
            },
            link_div: {
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#3366CC',
            },
            container: {
                backgroundColor: '#f5f5f5',
            },
        },
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: 'white',
                    }
                }
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        backgroundColor: '#1976d2',
                    }
                }
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        backgroundColor: '#1976d2'
                    }
                }
            },
        }
    });
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            text: {
                light: '#737373',
                darkBlue: '#7b1fa2',
            },
            sidebar: {
                menuHeader: '#1e1e1e',
                menuItem: '#121212',
            },
            link_div: {
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#3366CC',
            },
            container: {
                backgroundColor: '#1c1c1c',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    containedPrimary: {
                        color: 'white',
                        backgroundColor: 'black',
                        ":hover": {
                            backgroundColor: '#0d0d0d',
                        },
                    },
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        border: '1px solid',
                        borderColor: '#272727',
                    }
                }
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: {
                        color: 'white',
                    }
                }
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#121212',
                        color: '#414141',
                    }
                }
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        backgroundColor: '#272727',
                    }
                }
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#121212',
                    }
                }
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#121212',
                    }
                }
            },
        }
    });

    const cookies = new Cookies()
    const [theme, setTheme] = useState(cookies.get('phynanceDarkMode') ?
        (cookies.get('phynanceDarkMode') === 'light' ? lightTheme : darkTheme)
        : lightTheme);

    const switchTheme = () => {
        setTheme(prevTheme => {
            cookies.set('phynanceDarkMode', prevTheme.palette.mode === 'light' ? 'dark' : 'light');
            return prevTheme.palette.mode === 'light' ? darkTheme : lightTheme;
        });
    }

    const contextData = {
        theme,
        switchTheme,
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CustomThemeContext.Provider value={contextData}>
                {children}
            </CustomThemeContext.Provider>
        </ThemeProvider>
    )
}