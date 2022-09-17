import {useContext} from "react";
import {Navigate} from "react-router-dom";
import TopBar from "../components/topBar";
import Sidebar from "../components/sidebar";
import {Box, Toolbar} from "@mui/material";
import AxiosContext from "../contexts/AxiosContext";

const PrivateRoute = ({children }) => {
    const { authUser } = useContext(AxiosContext);

    return !authUser.authToken ? <Navigate to="/login" /> : (
        <>
            <Box sx={{ display: 'flex' }}>
                <TopBar
                    isPrivate={true}
                />
                <Sidebar />
            </Box>
            <Toolbar />
            {children}
        </>
    );
};

export default PrivateRoute;
