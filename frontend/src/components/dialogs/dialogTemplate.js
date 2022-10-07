import {Dialog} from "@mui/material";
import DialogTemplateTitle from "./dialogTemplateTitle";
import DialogTemplateContent from "./dialogTemplateContent";
import DialogTemplateActions from "./dialogTemplateActions";

function DialogTemplate({
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
            <DialogTemplateTitle
                onClose={onClose}
                titleIcon={titleIcon}
                titleText={titleText}
            />
            <DialogTemplateContent
                content={content}
            />
            <DialogTemplateActions
                actionWidth={actionWidth}
                action={action}
                actionText={actionText}
            />
        </Dialog>
    )
}

export default DialogTemplate;
