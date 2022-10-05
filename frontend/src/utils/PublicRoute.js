import {useContext} from "react";
import {Navigate} from "react-router-dom";
import AxiosContext from "../contexts/AxiosContext";
import {Box, Toolbar} from "@mui/material";
import TopBar from "../components/topBar";

const PublicRoute = ({children}) => {
    const {authUser} = useContext(AxiosContext);

    return authUser.authToken ? <Navigate to="/home"/> : (
        <>
            <Box sx={{display: 'flex'}}>
                <TopBar
                    ísPrivate={false}
                />
            </Box>
            <Toolbar/>
            {children}
        </>
    );
};

export default PublicRoute;
