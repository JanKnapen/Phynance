import './App.css';
import Login from "./components/login";
import {useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import Home from "./components/home";
import BankAccount from "./components/bankAccount";

function App() {
    const [token, setToken] = useState('');

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            token != null && token !== '' ? <Navigate to="/home" /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setToken={setToken}
                            />
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <Home
                                token={token}
                            />
                        }
                    />
                    <Route
                        path="/bank_account/:id"
                        element={
                            <BankAccount
                                token={token}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
