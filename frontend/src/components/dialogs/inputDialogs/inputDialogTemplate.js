import {Dialog} from "@mui/material";
import InputDialogTemplateTitle from "./inputDialogTemplateTitle";
import InputDialogTemplateContent from "./inputDialogTemplateContent";
import InputDialogTemplateActions from "./inputDialogTemplateActions";

function InputDialogTemplate({
    maxWidth,
    open,
    onClose,
    titleIcon,
    titleText,
    content,
    action,
    actionText,
    actionWidth,
                             }) {
    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullWidth
            maxWidth={maxWidth}
        >
            <InputDialogTemplateTitle
                onClose={onClose}
                titleIcon={titleIcon}
                titleText={titleText}
            />
            <InputDialogTemplateContent
                content={content}
            />
            <InputDialogTemplateActions
                actionWidth={actionWidth}
                action={action}
                actionText={actionText}
            />
        </Dialog>
    )
}

export default InputDialogTemplate;
