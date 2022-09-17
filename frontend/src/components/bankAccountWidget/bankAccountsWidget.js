import Card from '@mui/material/Card';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import {useEffect, useRef, useState} from "react";
import BankAccountsWidgetSettings from "./bankAccountsWidgetSettings";
import BankAccountsWidgetTable from "./bankAccountsWidgetTable";
import CategoriesDialog from "./categoriesDialog/categoriesDialog";
import AddBankAccountDialog from "../dialogs/inputDialogs/addBankAccountDialog/addBankAccountDialog";
import {CardHeader, IconButton} from "@mui/material";

function BankAccountsWidget() {
    const [openSettings, setOpenSettings] = useState(false);
    const [openAddBankAccount, setOpenAddBankAccount] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const anchorRefSettings = useRef(null);

    const handleToggleSettings = () => {
        setOpenSettings((prevOpen) => !prevOpen);
    };

    const handleCloseAddBankAccountDialog = () => {
        setOpenAddBankAccount(false);
    }

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
                    <AccountBalanceIcon />
                }
                action={
                    <>
                        <IconButton
                            ref={anchorRefSettings}
                            onClick={handleToggleSettings}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <BankAccountsWidgetSettings
                            openSettings={openSettings}
                            setOpenSettings={setOpenSettings}
                            setOpenAddBankAccount={setOpenAddBankAccount}
                            setOpenCategories={setOpenCategories}
                            anchorRefSettings={anchorRefSettings}
                        />
                        <AddBankAccountDialog
                            maxWidth='md'
                            actionWidth={200}
                            onClose={handleCloseAddBankAccountDialog}
                            open={openAddBankAccount}
                        />
                        <CategoriesDialog
                            setOpenCategories={setOpenCategories}
                            openCategories={openCategories}
                        />
                    </>
                }
                title="Bank Accounts"
                titleTypographyProps={{ variant:'h6' }}
            />
            <CardContent>
                <BankAccountsWidgetTable />
            </CardContent>
        </Card>
    );
}

export default BankAccountsWidget;
