import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export interface ConfirmationOptions {
    catchOnCancel?: boolean
    variant?: "danger" | "info"
    title: string
    description: string
}

export function ConfirmationDialog({
    open,
    title,

    description,
    onSubmit,
    onClose,
}) {
    return (
        <Dialog
            open={open}
            sx={{
                minWidth: "800px",
            }}
        >
            <DialogTitle>{title ? title : " "}</DialogTitle>
            <DialogContent sx={{ minWidth: "400px" }}>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose} autoFocus>
                    Cancel
                </Button>
                <Button color="error" onClick={onSubmit}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
