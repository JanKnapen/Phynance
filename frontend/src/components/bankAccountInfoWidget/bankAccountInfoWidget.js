import {useContext, useState} from "react";
import CustomThemeContext from "../../contexts/CustomThemeProvider";
import Grid from "@mui/material/Grid";
import BankAccountCardLogo from "./bankAccountCardLogo";
import {Button} from "@mui/material";
import BankAccountInfo from "./bankAccountInfo";
import BankContext from "../../contexts/BankContext";
import UploadTransactionsDialog from "../dialogs/uploadTransactionsDialog/uploadTransactionsDialog";
import CreateTransactionsDialog from "../dialogs/createTransactionsDialog/createTransactionsDialog";
import DeleteBankAccountDialog from "../dialogs/deleteBankAccountDialog/deleteBankAccountDialog";

function BankAccountInfoWidget() {
    const {theme} = useContext(CustomThemeContext);
    const {bankAccount} = useContext(BankContext);
    const [openUploadTransactionsDialog, setOpenUploadTransactionsDialog] = useState(false);
    const [openCreateTransactionsDialog, setOpenCreateTransactionsDialog] = useState(false);
    const [openDeleteBankAccountDialog, setOpenDeleteBankAccountDialog] = useState(false);

    const handleCloseUploadTransactionsDialog = () => {
        setOpenUploadTransactionsDialog(false);
    }

    const handleCloseCreateTransactionsDialog = () => {
        setOpenCreateTransactionsDialog(false);
    }

    const handleCloseDeleteBankAccountDialog = () => {
        setOpenDeleteBankAccountDialog(false);
    }

    return (
        <div
            style={{
                ...theme.palette.container,
                borderRadius: 10,
            }}
        >
            <Grid container
                  pt={5}
                  pl={5}
                  pb={5}
                  pr={5}
            >
                <Grid item xs={12} paddingBottom={5}>
                    <BankAccountCardLogo
                        IBAN={bankAccount ? bankAccount.IBAN : ''}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    paddingLeft={3}
                    paddingRight={3}
                    paddingBottom={5}
                >
                    <BankAccountInfo/>
                </Grid>
                <Grid
                    item
                    xs={12}
                    paddingBottom={2}
                >
                    <Button
                        variant='contained'
                        style={{
                            width: '60%',
                        }}
                        onClick={() => setOpenUploadTransactionsDialog(true)}
                    >
                        Upload Transactions
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        color='warning'
                        style={{
                            width: '60%',
                        }}
                        onClick={() => setOpenDeleteBankAccountDialog(true)}
                    >
                        Delete Bank Account
                    </Button>
                </Grid>
                <UploadTransactionsDialog
                    open={openUploadTransactionsDialog}
                    onClose={handleCloseUploadTransactionsDialog}
                    maxWidth='md'
                    setOpenCreateTransactionsDialog={setOpenCreateTransactionsDialog}
                />
                <CreateTransactionsDialog
                    open={openCreateTransactionsDialog}
                    onClose={handleCloseCreateTransactionsDialog}
                    maxWidth='xl'
                />
                <DeleteBankAccountDialog
                    open={openDeleteBankAccountDialog}
                    onClose={handleCloseDeleteBankAccountDialog}
                />
            </Grid>
        </div>
    )
}

export default BankAccountInfoWidget;
