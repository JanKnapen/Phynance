import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import TopBar from "../components/topBar";
import Sidebar from "../components/sidebar";
import {Box, Toolbar} from "@mui/material";

const PrivateRoute = ({children }) => {
    let {user} = useContext(AuthContext);

    return !user ? <Navigate to="/login" /> : (
        <>
            <Box sx={{ display: 'flex' }}>
                <TopBar />
                <Sidebar />
            </Box>
            <Toolbar />
            {children}
        </>
    );
};

export default PrivateRoute;
