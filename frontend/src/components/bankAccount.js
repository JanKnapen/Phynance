import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function BankAccount({ authenticatedCredentials }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bankAccount, setBankAccount] = useState({});

    useEffect(() => {
        if (authenticatedCredentials == null) {
            navigate('/login');
        } else {
            axios.get('http://localhost:8000/bank_portfolio/bank_accounts/' + id, {
                headers: {
                    'Authorization': `token ${authenticatedCredentials.token}`,
                },
            })
                .then(response => {
                    setBankAccount(response.data);
                })
                .catch(error => {
                    console.error(error.message);
                });
        }
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h1>{bankAccount.name}</h1>
            <p>Description: {bankAccount.description}</p>
            <p>IBAN: {bankAccount.IBAN}</p>
        </div>
    );
}

export default BankAccount;
