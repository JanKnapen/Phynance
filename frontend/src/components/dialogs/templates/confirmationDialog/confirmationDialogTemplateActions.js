import {Button, DialogActions} from "@mui/material";

function ConfirmationDialogTemplateActions({
                                               onConfirmation,
                                               onClose,
                                            }) {
    return (
        <DialogActions style={{justifyContent: 'center'}}>
            <Button
                autoFocus
                onClick={onConfirmation}
                variant='contained'
                color='warning'
                style={{
                    width: '4vw',
                }}
            >
                Yes
            </Button>
            <Button
                autoFocus
                onClick={onClose}
                variant='outlined'
                style={{
                    width: '4vw',
                }}
            >
                No
            </Button>
        </DialogActions>
    )
}

export default ConfirmationDialogTemplateActions;
