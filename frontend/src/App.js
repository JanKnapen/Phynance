import './App.css';
import Login from "./components/login";
import {useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import Home from "./components/home";
import BankAccount from "./components/bankAccount";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topBar";
import {Box} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

function App() {
    const [authenticatedCredentials, setAuthenticatedCredentials] = useState(null);

    return (
        <div className="App">
            <Router>
                {authenticatedCredentials != null ? (
                    <Box sx={{ display: 'flex' }}>
                        <TopBar
                            setAuthenticatedCredentials={setAuthenticatedCredentials}
                        />
                        <Sidebar
                            authenticatedCredentials={authenticatedCredentials}
                        />
                    </Box>
                ) : null}
                <Toolbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            authenticatedCredentials != null ? <Navigate to="/home" /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setAuthenticatedCredentials={setAuthenticatedCredentials}
                            />
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <div></div>
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <Home />
                        }
                    />
                    <Route
                        path="/bank_account/:id"
                        element={
                            <BankAccount
                                authenticatedCredentials={authenticatedCredentials}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
