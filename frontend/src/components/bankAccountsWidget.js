import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import {
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TableCell,
    TableRow,
  TextField
} from '@mui/material';

function BankAccountsWidget({  bankAccounts }) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <AccountBalanceIcon />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Bank Accounts"
                titleTypographyProps={{ variant:'h6' }}
                style={{ backgroundColor: '#1565c0' }}
            />
            <CardContent>
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
                                <TableRow>
                                    <TableCell width={300}>{bankAccount.name}</TableCell>
                                    <TableCell>100</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Table>
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
            </CardContent>
        </Card>
    );
}

export default BankAccountsWidget;
