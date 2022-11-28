import Grid from "@mui/material/Grid";
import {Button, Checkbox, TextField} from "@mui/material";
import {useContext, useState} from "react";
import BankContext from "../../contexts/BankContext";

function TransactionsTableRowExtraOptions({transaction, setTransactions}) {
    const {
        paymentRequests,
        setPaymentRequests,
    } = useContext(BankContext);
    const [openExtraOptions, setOpenExtraOptions] = useState(false);
    const [isPaymentRequest, setIsPaymentRequest] = useState(false);
    const [paymentRequestAmount, setPaymentRequestAmount] = useState(transaction.amount > 0 ? transaction.amount : null);
    const [originalTransactionAmount, _] = useState(transaction.amount); // eslint-disable-line

    const updateTransactionAmount = (amount) => {
        setTransactions(prevTransactions => prevTransactions.map(prevTransaction => {
            if (prevTransaction.serial_number === transaction.serial_number) {
                return {
                    ...prevTransaction,
                    amount: amount,
                }
            }
            return prevTransaction;
        }))
    }

    const paymentRequestExists = () => {
        return paymentRequests.some(paymentRequest =>
            paymentRequest.original_bank_transaction === transaction.serial_number
        );
    }

    const createPaymentRequest = () => {
        setPaymentRequests(prevPaymentRequests => [
            ...prevPaymentRequests,
            {
                original_bank_transaction: transaction.serial_number,
                amount: paymentRequestAmount,
                bank_account: transaction.bank_account,
            },
        ])
    }

    const updatePaymentRequestAmount = () => {
        if (!paymentRequestExists()) {
            createPaymentRequest();
        } else {
            setPaymentRequests(prevPaymentRequests => prevPaymentRequests.map(prevPaymentRequest => {
                if (prevPaymentRequest.original_bank_transaction === transaction.serial_number) {
                    return {
                        ...prevPaymentRequest,
                        amount: paymentRequestAmount,
                    }
                }
                return prevPaymentRequest;
            }))
        }
    }

    const removePaymentRequest = () => {
        setPaymentRequests(prevPaymentRequests => prevPaymentRequests.filter(
            paymentRequest => paymentRequest.original_bank_transaction !== transaction.serial_number
        ));
    }

    const toggleOpenExtraOptions = () => {
        setOpenExtraOptions(prevState => {
            updateTransactionAmount(originalTransactionAmount);
            removePaymentRequest();
            setIsPaymentRequest(false);
            return !prevState;
        });
    }

    const togglePaymentRequestOption = () => {
        setIsPaymentRequest(prevState => {
            if (prevState === true) {
                removePaymentRequest();
                updateTransactionAmount(originalTransactionAmount);
            } else {
                updatePaymentRequestAmount();
                updateTransactionAmount(originalTransactionAmount - paymentRequestAmount);
            }
            return !prevState;
        });
    }

    const onPaymentRequestAmountChanged = event => {
        if (event.target.value >= 0) {
            setPaymentRequestAmount(event.target.value);
        }
    }

    const onPaymentRequestAmountConfirmed = event => {
        if (event.target.value < 0 || event.target.value > transaction.amount) {
            setPaymentRequestAmount(originalTransactionAmount);
        } else {
            updatePaymentRequestAmount();
            updateTransactionAmount(originalTransactionAmount - paymentRequestAmount);
        }
    }

    return (
        <Grid
            item
            xs={12}
            container
            style={{
                height: openExtraOptions ? 100 : 50,
            }}
        >
            <Grid
                item
                xs={3}
                pl={2}
            >
                <Button
                    variant={openExtraOptions ? 'contained' : 'text'}
                    onClick={toggleOpenExtraOptions}
                    style={{
                        width: '50%',
                    }}
                >
                    Extra Options
                </Button>
            </Grid>
            {openExtraOptions ?
                <Grid
                    item
                    xs={9}
                    style={{
                        height: 100,
                    }}
                    container
                >
                    <Grid
                        item
                        xs={5}
                        style={{
                            height: '50%',
                        }}
                    >
                    </Grid>
                    <Grid
                        item
                        visibility={openExtraOptions}
                        xs={1}
                        style={{
                            height: '50%',
                            display: 'flex',
                            justifyContent: 'right',
                        }}
                    >
                        <Checkbox
                            disabled={transaction.amount < 0}
                            onChange={togglePaymentRequestOption}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        style={{
                            height: '50%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Payment Request
                    </Grid>
                    <Grid
                        item
                        xs={1}
                        style={{
                            height: '50%',
                        }}
                    >
                        <TextField
                            name='paymentRequestAmount'
                            disabled={!isPaymentRequest}
                            type='number'
                            value={paymentRequestAmount}
                            onChange={onPaymentRequestAmountChanged}
                            onBlur={onPaymentRequestAmountConfirmed}
                        />
                    </Grid>
                </Grid>
                :
                <Grid
                    item
                    xs={9}
                    style={{
                        height: 50,
                    }}
                    container
                >
                </Grid>
            }
        </Grid>
    )
}

export default TransactionsTableRowExtraOptions;
