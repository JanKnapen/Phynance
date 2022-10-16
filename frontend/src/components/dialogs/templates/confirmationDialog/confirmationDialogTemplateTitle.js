import {DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ConfirmationDialogTemplateTitle({
                                             onClose,
                                             titleIcon,
                                             text,
                                         }) {
    return (
        <DialogTitle
            onClose={onClose}
            style={{
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: 20,
                    top: 20,
                }}
            >
                {titleIcon}
            </div>
            {text}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                }}
            >
                <CloseIcon/>
            </IconButton>
        </DialogTitle>
    )
}

export default ConfirmationDialogTemplateTitle;
