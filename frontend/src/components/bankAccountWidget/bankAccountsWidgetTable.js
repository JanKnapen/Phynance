import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

function BankAccountsWidgetTable({ bankAccounts }) {
    const navigate = useNavigate();

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={300} tooltip="The Name">
                            <b>Name</b>
                        </TableCell>
                        <TableCell tooltip="The Balance">
                            <b>Balance</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <TableContainer style={{ minHeight: 200, maxHeight: 200}}>
                <Table>
                    <TableBody>
                        { bankAccounts && bankAccounts.map((bankAccount, index) => (
                            <TableRow
                                onClick={(event) => navigate('/bank_account/' + bankAccount.id)}
                                hover
                                style={{cursor: 'pointer'}}
                            >
                                <TableCell width={300}>{bankAccount.name}</TableCell>
                                <TableCell>100</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Table style={{borderTop: '1px solid #e0e0e0'}}>
                <TableHead>
                    <TableRow>
                        <TableCell width={300}>
                            <b>Total</b>
                        </TableCell>
                        <TableCell>
                            <b>1500</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </>
    );
}

export default BankAccountsWidgetTable;
