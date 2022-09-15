import {createContext} from "react";
import {useSnackbar} from "notistack";

const NotificationsContext = createContext(null);

export default NotificationsContext;

export const NotificationsProvider = ({children}) => {
    const { enqueueSnackbar } = useSnackbar();

    const enqueueSnackbarWithOptions = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            autoHideDuration: 2500,
        })
    }

    const enqueueErrorSnackbar = (message) => {
        enqueueSnackbarWithOptions(message, 'error');
    }

    const enqueueSuccessSnackbar = (message) => {
        enqueueSnackbarWithOptions(message, 'success');
    }

    const contextData = {
        enqueueErrorSnackbar,
        enqueueSuccessSnackbar,
    };

    return (
        <NotificationsContext.Provider value={contextData}>
            {children}
        </NotificationsContext.Provider>
    );
}