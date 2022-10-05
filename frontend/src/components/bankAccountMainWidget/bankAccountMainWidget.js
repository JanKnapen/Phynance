import {useContext, useEffect, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import Grid from "@mui/material/Grid";
import ButtonSelector from "../../utils/buttonSelector";
import TransactionsTable from "../transactionsTable/transactionsTable";
import BankContext from "../../contexts/BankContext";
import {ClickAwayListener, Grow, MenuList, Paper, Popper, TextField, ThemeProvider} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import NotificationsContext from "../../contexts/NotificationsContext";

function BankAccountMainWidget() {
    const {theme, datePickerTheme} = useContext(CustomThemeContext);
    const {enqueueErrorSnackbar} = useContext(NotificationsContext);
    const {
        bankAccount,
        getTransactions,
        transactions,
    } = useContext(BankContext);
    const periodOptions = [
        {
            name: 'month',
            disable: true,
            onClick: () => setPeriod('month'),
        },
        {
            name: 'year',
            disable: true,
            onClick: () => setPeriod('year'),
        },
        {
            name: 'custom',
            disable: false,
            onClick: (event) => {
                setOpenDateRangeSelector(true);
                setAnchorEl(event.currentTarget);
                handleDateRangeChange(dateRange);
            },
        },
    ];
    const [period, setPeriod] = useState(periodOptions[0].name);
    const overviewOptions = [
        {
            name: 'transactions',
            disable: true,
            onClick: () => setOverview('transactions'),
        }
    ];
    const [overview, setOverview] = useState(overviewOptions[0].name);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDateRangeSelector, setOpenDateRangeSelector] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    const handleDateRangeChange = (newDateRange) => {
        if (newDateRange.startDate && newDateRange.endDate) {
            if (newDateRange.startDate > newDateRange.endDate) {
                enqueueErrorSnackbar('Please make sure the start date is before the end date.');
            } else {
                setPeriod('custom');
                getTransactions({
                    bankAccountId: bankAccount.id,
                    period: 'custom',
                    dateRange: newDateRange,
                });
            }
        }
    }

    useEffect(() => {
        if (bankAccount.id != null) {
            getTransactions({
                bankAccountId: bankAccount.id,
                period: period,
            });
        }
    }, [bankAccount.id]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (bankAccount.id != null) {
            getTransactions({
                bankAccountId: bankAccount.id,
                period: period,
            });
        }
    }, [period]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
                width: '100%',
            }}
        >
            <Grid
                container
                padding={5}
            >
                <Grid item xs={1}>
                    <ButtonSelector
                        options={overviewOptions}
                        currentOption={overview}
                        setCurrentOption={setOverview}
                    />
                </Grid>
                <Grid item xs={9}/>
                <Grid item xs={2}>
                    <ButtonSelector
                        options={periodOptions}
                        currentOption={period}
                        setCurrentOption={setPeriod}
                    />
                    <Popper
                        open={openDateRangeSelector}
                        anchorEl={anchorEl}
                        transition
                        disablePortal
                    >
                        {({TransitionProps}) => (
                            <Grow
                                {...TransitionProps}
                                style={{transformOrigin: 'right top'}}
                            >
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={() => {
                                            setOpenDateRangeSelector(false);
                                        }}
                                    >
                                        <MenuList
                                            autoFocusItem={openDateRangeSelector}
                                            style={{
                                                padding: 10,
                                            }}
                                        >
                                            <ThemeProvider theme={datePickerTheme}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label='Start Date'
                                                        value={dateRange.startDate}
                                                        onChange={(newStartDate) => {
                                                            setDateRange(prevDateRange => {
                                                                const newDateRange = {
                                                                    ...prevDateRange,
                                                                    startDate: newStartDate,
                                                                };
                                                                handleDateRangeChange(newDateRange);
                                                                return newDateRange;
                                                            });
                                                        }}
                                                        renderInput={(params) => <TextField {...params}/>}
                                                    />
                                                    <DatePicker
                                                        label='End Date'
                                                        value={dateRange.endDate}
                                                        onChange={(newEndDate) => {
                                                            setDateRange(prevDateRange => {
                                                                const newDateRange = {
                                                                    ...prevDateRange,
                                                                    endDate: newEndDate,
                                                                };
                                                                handleDateRangeChange(newDateRange);
                                                                return newDateRange;
                                                            });
                                                        }}
                                                        renderInput={(params) => <TextField {...params}
                                                                                            sx={{svg: theme.palette.datePickerIcon}}/>}
                                                    />
                                                </LocalizationProvider>
                                            </ThemeProvider>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
                <Grid item xs={12}>
                    <TransactionsTable
                        editable={false}
                        transactions={transactions}
                        minHeight='60vh'
                        maxHeight='60vh'
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default BankAccountMainWidget;
