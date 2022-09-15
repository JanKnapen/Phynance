import './App.css';
import Login from "./components/login";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import Home from "./components/home";
import BankAccount from "./components/bankAccount";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./components/register";
import PublicRoute from "./utils/PublicRoute";
import Contexts from "./Contexts";

function App() {
    return (
        <div className="App">
            <Router>
                <Contexts>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Navigate to="/home" />
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <PrivateRoute>
                                    <div></div>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/bank_account/:id"
                            element={
                                <PrivateRoute><BankAccount />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Contexts>
            </Router>
        </div>
    );
}

export default App;
