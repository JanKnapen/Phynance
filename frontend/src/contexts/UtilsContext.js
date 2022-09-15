import {createContext, useContext, useEffect, useState} from "react";
import {
    MedicalInformation,
    FlightTakeoff,
    DriveEta,
    SportsEsports,
    School,
    Savings,
    LocalGroceryStore,
    Fastfood,
} from "@mui/icons-material";
import AxiosContext from "./AxiosContext";

const UtilsContext = createContext(null);

export default UtilsContext;

export const UtilsProvider = ({children}) => {
    const { getMUIIconsRequest } = useContext(AxiosContext);
    const [MUIIcons, setMUIIcons] = useState([]);

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
            response.data.forEach(({ id, mui_name }) => setMUIIcons(prevState => ([
                ...prevState,
                {
                    id: id,
                    name: mui_name,
                    icon: MUIIconComponents[mui_name],
                }
                ])))
        }
        const handleError = (error) => {
            //TODO
        }
        getMUIIconsRequest(handleResponse, handleError);
    }

    useEffect(() => {
        getMUIIcons();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const contextData = {
        MUIIcons,
        getMUIIcons,
    };

    return (
        <UtilsContext.Provider value={contextData}>
            {children}
        </UtilsContext.Provider>
    );
};