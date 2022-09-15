import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import {useContext, useEffect, useRef, useState} from "react";
import AddBankAccountDialog from "./addBankAccountDialog/addBankAccountDialog";
import BankAccountsWidgetSettings from "./bankAccountsWidgetSettings";
import BankAccountsWidgetTable from "./bankAccountsWidgetTable";
import CategoriesDialog from "./categoriesDialog/categoriesDialog";

function BankAccountsWidget() {
    const [openSettings, setOpenSettings] = useState(false);
    const [openAddBankAccount, setOpenAddBankAccount] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const anchorRefSettings = useRef(null);

    const handleToggleSettings = () => {
        setOpenSettings((prevOpen) => !prevOpen);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpenSettings = useRef(openSettings);
    useEffect(() => {
        if (prevOpenSettings.current === true && openSettings === false) {
            anchorRefSettings.current.focus();
        }

        prevOpenSettings.current = openSettings;
    }, [openSettings]);

    return (
        <Card>
            <CardHeader
                avatar={
                    <AccountBalanceIcon
                        style={{ color: 'white' }}
                    />
                }
                action={
                    <>
                        <IconButton
                            ref={anchorRefSettings}
                            onClick={handleToggleSettings}
                        >
                            <MoreVertIcon
                                style={{ color: 'white' }}
                            />
                        </IconButton>
                        <BankAccountsWidgetSettings
                            openSettings={openSettings}
                            setOpenSettings={setOpenSettings}
                            setOpenAddBankAccount={setOpenAddBankAccount}
                            setOpenCategories={setOpenCategories}
                            anchorRefSettings={anchorRefSettings}
                        />
                        <AddBankAccountDialog
                            setOpenAddBankAccount={setOpenAddBankAccount}
                            openAddBankAccount={openAddBankAccount}
                        />
                        <CategoriesDialog
                            setOpenCategories={setOpenCategories}
                            openCategories={openCategories}
                        />
                    </>
                }
                title="Bank Accounts"
                titleTypographyProps={{ variant:'h6' }}
                style={{ backgroundColor: '#1976d2', color: 'white' }}
            />
            <CardContent>
                <BankAccountsWidgetTable />
            </CardContent>
        </Card>
    );
}

export default BankAccountsWidget;
