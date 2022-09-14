import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function BankAccount() {
    const { id } = useParams();
    const [bankAccount, setBankAccount] = useState({});

    useEffect(() => {
        setBankAccount({
            name: null,
            description: null,
            IBAN: null
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
