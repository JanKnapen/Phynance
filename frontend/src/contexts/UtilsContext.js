import {createContext, useContext, useEffect, useState} from "react";
import {
    DriveEta,
    Fastfood,
    FlightTakeoff,
    LocalGroceryStore,
    MedicalInformation,
    Savings,
    School,
    SportsEsports,
} from "@mui/icons-material";
import AxiosContext from "./AxiosContext";
import NotificationsContext from "./NotificationsContext";

const UtilsContext = createContext(null);

export default UtilsContext;

export const UtilsProvider = ({children}) => {
    const {enqueueErrorSnackbar} = useContext(NotificationsContext);
    const {
        getMUIIconsRequest,
        getCurrenciesRequest,
    } = useContext(AxiosContext);
    const [MUIIcons, setMUIIcons] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    const MUIIconComponents = {
        'MedicalInformation': MedicalInformation,
        'FlightTakeoff': FlightTakeoff,
        'DriveEta': DriveEta,
        'SportsEsports': SportsEsports,
        'School': School,
        'Savings': Savings,
        'LocalGroceryStore': LocalGroceryStore,
        'Fastfood': Fastfood,
    };

    const getMUIIcons = () => {
        const handleResponse = (response) => {
            response.data.forEach(({id, mui_name}) => setMUIIcons(prevState => ([
                ...prevState,
                {
                    id: id,
                    name: mui_name,
                    icon: MUIIconComponents[mui_name],
                }
            ])))
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to load the Icon options, reload to try again.');
        }
        getMUIIconsRequest(handleResponse, handleError);
    }

    const getCurrencies = () => {
        const handleResponse = (response) => {
            setCurrencies(response.data);
        }
        const handleError = () => {
            enqueueErrorSnackbar('Unable to load the currencies options, reload to try again.');
        }
        getCurrenciesRequest(handleResponse, handleError);
    }

    const handleSaveRequestError = (error, type) => {
        let errorMessage = 'Unable to save ' + type + ': ';
        if ((error.response.data.name && (error.response.data.name[0] === 'This field may not be blank.' || error.response.data.name[0] === 'This field may not be null.'))
            || (error.response.data.description && (error.response.data.description[0] === 'This field may not be blank.' || error.response.data.description[0] === 'This field may not be null.'))
        ) {
            errorMessage += 'make sure to fill in all the fields.';
        } else {
            if (error.response.data.name) {
                errorMessage += error.response.data.name;
            } else if (error.response.data.description) {
                errorMessage += error.response.data.description;
            } else {
                errorMessage += 'unknown error'
            }
        }
        enqueueErrorSnackbar(errorMessage);
    }

    useEffect(() => {
        getMUIIcons();
        getCurrencies();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const contextData = {
        MUIIcons,
        getMUIIcons,
        handleSaveRequestError,
        currencies,
    };

    return (
        <UtilsContext.Provider value={contextData}>
            {children}
        </UtilsContext.Provider>
    );
};