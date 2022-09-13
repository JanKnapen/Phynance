import './App.css';
import Login from "./components/login";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import Home from "./components/home";
import BankAccount from "./components/bankAccount";
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
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
                                <Login />
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
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
