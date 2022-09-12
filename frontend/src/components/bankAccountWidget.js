import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function BankAccountWidget({ id, name }) {
    const navigate = useNavigate();

    const openBankAccount = event => {
        navigate('/bank_account/' + id);
    }

    return (
        <div>
            <div>{name}</div>
            <Button
                variant="contained"
                onClick={openBankAccount}
            >Open</Button>
        </div>
    )
}

export default BankAccountWidget;
