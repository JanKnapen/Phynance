import {createContext} from "react";
import {useSnackbar} from "notistack";
import {IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";

const NotificationsContext = createContext(null);

export default NotificationsContext;

function SnackbarCloseButton({variant, snackbarKey}) {
    const {closeSnackbar} = useSnackbar();

    return (
        <IconButton
            onClick={() => closeSnackbar(snackbarKey)}
        >
            <Close/>
        </IconButton>
    )
}

export const NotificationsProvider = ({children}) => {
    const {enqueueSnackbar} = useSnackbar();

    const enqueueSnackbarWithOptions = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            autoHideDuration: 2500,
            action: (snackbarKey) => <SnackbarCloseButton variant={variant} snackbarKey={snackbarKey}/>
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