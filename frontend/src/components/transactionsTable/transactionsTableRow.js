import Grid from "@mui/material/Grid";
import {MenuItem, Select, Tooltip} from "@mui/material";
import {createElement, useContext} from "react";
import BankContext from "../../contexts/BankContext";
import UtilsContext from "../../contexts/UtilsContext";

function TransactionsTableRow({transaction, setTransactions}) {
    const {categories} = useContext(BankContext);
    const {MUIIcons} = useContext(UtilsContext);

    const getMUIIcon = (category) => {
        const MUIIcon = MUIIcons.find(MUIIcon => MUIIcon.id === category.icon);
        return createElement(MUIIcon.icon, {key: MUIIcon.icon}, null);
    }

    const getCategoryName = (categoryId) => {
        const category = categories.find(category => category.id === categoryId);
        return category.name;
    }

    const updateCategory = (event) => {
        const transactionSerialNumber = parseInt(event.target.name);
        const categoryId = event.target.value;
        setTransactions(prevTransactions => prevTransactions.map(transaction => {
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
        <Grid
            item
            xs={12}
            container
            style={{
                height: 100,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}
        >
            <Grid
                item
                xs={2}
            >
                {new Date(transaction.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </Grid>
            <Grid
                item
                xs={1}
            >
                {transaction.amount}
            </Grid>
            <Grid
                item
                xs={8}
            >
                {/*TODO: continue on new line when description is to long*/}
                {transaction.description}
            </Grid>
            <Grid
                item
                xs={1}
            >
                <Tooltip
                    title={transaction.category ? getCategoryName(transaction.category) : 'Select Category'}
                    placement='left'
                >
                    <Select
                        label='Icon'
                        name={transaction.serial_number.toString()}
                        renderValue={(value) => {
                            if (value === '') return <div>None</div>
                            const category = categories.find(category => category.id === value);
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
                                <div style={{
                                    paddingLeft: 10,
                                    float: 'right'
                                }}>{category.name}</div>
                            </MenuItem>
                        ))}
                    </Select>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default TransactionsTableRow;
