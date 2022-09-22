import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {createElement, useContext} from "react";
import BankContext from "../../../../contexts/BankContext";
import UtilsContext from "../../../../contexts/UtilsContext";

function CreateTransactionsDialogContent() {
    const {
        processedTransactions,
        setProcessedTransactions,
        categories,
    } = useContext(BankContext);
    const { MUIIcons } = useContext(UtilsContext);

    const getMUIIcon = (category) => {
        const MUIIcon = MUIIcons.filter(MUIIcon => MUIIcon.id === category.icon)[0];
        return createElement(MUIIcon.icon, {key: MUIIcon.icon}, null);
    }

    const getCategoryName = (categoryId) => {
        const category = categories.filter(category => category.id === categoryId)[0];
        return category.name;
    }

    const updateCategory = (event) => {
        const transactionSerialNumber = parseInt(event.target.name);
        const categoryId = event.target.value;
        setProcessedTransactions(prevTransactions => prevTransactions.map(transaction => {
            if (transaction.serial_number === transactionSerialNumber) {
                return {
                    ...transaction,
                    category: categoryId,
                }
            }
            return transaction;
        }));
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={130} tooltip="The Date">
                            <b>Date</b>
                        </TableCell>
                        <TableCell width={50} tooltip="The Amount">
                            <b>Amount</b>
                        </TableCell>
                        <TableCell width={1200} tooltip="The Description">
                            <b>Description</b>
                        </TableCell>
                        <TableCell width={150} tooltip="The Category">
                            <b>Category</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <TableContainer style={{ maxHeight: 700}}>
                <Table>
                    <TableBody>
                        { processedTransactions.map((transaction, index) => (
                            <TableRow
                                key={transaction.serial_number}
                            >
                                <TableCell width={100}>{new Date(transaction.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                <TableCell width={50}>{transaction.amount}</TableCell>
                                <TableCell width={900}>{transaction.description}</TableCell>
                                <TableCell width={50}>{
                                    <Tooltip
                                        title={transaction.category ? getCategoryName(transaction.category) : 'Select Category'}
                                        placement='left'
                                    >
                                        <Select
                                            label='Icon'
                                            name={transaction.serial_number.toString()}
                                            renderValue={(value) => {
                                                if (value === '') return <div>None</div>
                                                const category = categories.filter(category => category.id === value)[0]
                                                return getMUIIcon(category)
                                            }}
                                            defaultValue={transaction.category ?? ''}
                                            style={{
                                                width: 80,
                                                height: 60,
                                            }}
                                            onChange={updateCategory}
                                        >
                                            {categories.map(category => (
                                                <MenuItem
                                                    value={category.id}
                                                    key={category.id}
                                                >
                                                    {getMUIIcon(category)}
                                                    <div style={{paddingLeft: 10, float: 'right'}}>{category.name}</div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Tooltip>
                                }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CreateTransactionsDialogContent;
