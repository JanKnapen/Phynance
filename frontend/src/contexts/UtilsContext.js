import {createContext} from "react";
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

const UtilsContext = createContext(null);

export default UtilsContext;

export const UtilsProvider = ({children}) => {
    const MUIIcons = [
        {
            id: 8,
            name: 'MedicalInformation',
            icon: MedicalInformation
        },
        {
            id: 7,
            name: 'FlightTakeoff',
            icon: FlightTakeoff
        },
        {
            id: 6,
            name: 'DriveEta',
            icon: DriveEta
        },
        {
            id: 5,
            name: 'SportsEsports',
            icon: SportsEsports
        },
        {
            id: 4,
            name: 'School',
            icon: School
        },
        {
            id: 3,
            name: 'Savings',
            icon: Savings
        },
        {
            id: 2,
            name: 'LocalGroceryStore',
            icon: LocalGroceryStore
        },
        {
            id: 1,
            name: 'Fastfood',
            icon: Fastfood
        },
    ];

    const contextData = {
        MUIIcons,
    };

    return (
        <UtilsContext.Provider value={contextData}>
            {children}
        </UtilsContext.Provider>
    );
};