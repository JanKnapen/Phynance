import {Button, DialogActions} from "@mui/material";

function InputDialogTemplateActions({
    actionWidth,
    action,
    actionText,
                                    }) {
    return (
        <DialogActions style={{justifyContent: 'center'}}>
            <Button
                autoFocus
                onClick={action}
                variant='contained'
                style={{ width: actionWidth }}
            >
                {actionText}
            </Button>
        </DialogActions>
    )
}

export default InputDialogTemplateActions;
