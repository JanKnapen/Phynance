import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import BankAccountWidget from "./bankAccountWidget";

function Home({ token }) {
    const navigate = useNavigate();
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(() => {
        if (token == null || token === '') {
            navigate('/login');
        } else {
            axios.get('http://localhost:8000/bank_portfolio/bank_accounts/', {
                headers: {
                    'Authorization': `token ${token}`,
                },
            })
                .then(response => {
                    setBankAccounts(response.data);
                })
                .catch(error => {
                    console.error(error.message);
                });
        }
    }, [])

    return (
        <div>
            <h1>Home Page</h1>
            {bankAccounts.map(({ id, name }) => (
                <BankAccountWidget
                    id={id}
                    name={name}
                />
            ))}
        </div>
    );
}

export default Home;
