import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function BankAccount({ token }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bankAccount, setBankAccount] = useState({});

    useEffect(() => {
        if (token == null || token === '') {
            navigate('/login');
        } else {
            axios.get('http://localhost:8000/bank_portfolio/bank_accounts/' + id, {
                headers: {
                    'Authorization': `token ${token}`,
                },
            })
                .then(response => {
                    setBankAccount(response.data);
                })
                .catch(error => {
                    console.error(error.message);
                });
        }
    }, [])

    return (
        <div>
            <h1>{bankAccount.name}</h1>
            <p>Description: {bankAccount.description}</p>
            <p>IBAN: {bankAccount.IBAN}</p>
        </div>
    );
}

export default BankAccount;
