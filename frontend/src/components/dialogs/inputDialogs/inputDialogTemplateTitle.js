import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {DialogTitle} from "@mui/material";

function InputDialogTemplateTitle({
    onClose,
    titleIcon,
    titleText,
                                  }) {
    return (
        <DialogTitle
            onClose={onClose}
            style={{
                backgroundColor: '#1976d2',
                color: 'white',
                textAlign: 'center',
            }}
        >
            <IconButton
                disabled
                sx={{
                    position: 'absolute',
                    left: 12,
                    top: 12,
                    ":disabled": {
                        color: 'white',
                    },
                }}
            >
                {titleIcon}
            </IconButton>
            {titleText}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    color: 'white',
                }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    )
}

export default InputDialogTemplateTitle;
