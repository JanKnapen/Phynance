import {useContext, useEffect, useState} from "react";
import NotificationsContext from "../contexts/NotificationsContext";
import ButtonSelector from "./buttonSelector";
import {ClickAwayListener, Grow, MenuList, Paper, Popper, TextField, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import CustomThemeContext from "../contexts/CustomThemeProvider";

function PeriodSelector({period, setPeriod, action}) {
    const {theme, datePickerTheme} = useContext(CustomThemeContext);
    const {enqueueErrorSnackbar} = useContext(NotificationsContext);
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
                action('custom', newDateRange);
            }
        }
    }

    useEffect(() => {
        if (period != null) {
            action(period);
        }
    }, [period]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setPeriod(periodOptions[0].name);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
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
        </>
    )
}

export default PeriodSelector;
