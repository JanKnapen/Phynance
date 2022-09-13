import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

function BankAccount() {
    const { authTokens } = useContext(AuthContext);
    const { id } = useParams();
    const [bankAccount, setBankAccount] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/bank_portfolio/bank_accounts/' + id, {
            headers: {
                'Authorization': `token ${authTokens.token}`,
            },
        })
            .then(response => {
                setBankAccount(response.data);
            })
            .catch(error => {
                console.error(error.message);
            });
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
