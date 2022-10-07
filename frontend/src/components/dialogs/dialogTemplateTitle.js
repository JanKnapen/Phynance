import CloseIcon from "@mui/icons-material/Close";
import {DialogTitle, IconButton} from "@mui/material";

function DialogTemplateTitle({
                                 onClose,
                                 titleIcon,
                                 titleText,
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
            {titleText}
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

export default DialogTemplateTitle;
