import {Dialog} from "@mui/material";
import ConfirmationDialogTemplateActions from "./confirmationDialogTemplateActions";
import ConfirmationDialogTemplateTitle from "./confirmationDialogTemplateTitle";

function ConfirmationDialogTemplate({
                                        open,
                                        onClose,
                                        titleIcon,
                                        text,
                                        onConfirmation
                                    }) {
    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullWidth
            maxWidth='sm'
        >
            <ConfirmationDialogTemplateTitle
                onClose={onClose}
                titleIcon={titleIcon}
                text={text}
            />
            <ConfirmationDialogTemplateActions
                onConfirmation={onConfirmation}
                onClose={onClose}
            />
        </Dialog>
    )
}

export default ConfirmationDialogTemplate;
