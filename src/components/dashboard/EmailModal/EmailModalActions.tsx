import type { FC, ReactElement, ReactNode } from "react"
import { Button } from "@mui/material"
import type { ButtonProps } from "@mui/material"

interface EmailActionProps extends ButtonProps {
    icon?: ReactElement
    children?: ReactNode
    onClick?: (values: any) => void
}

export const EmailSave: FC<EmailActionProps> = (props) => {
    const { icon, children, ...other } = props

    return (
        <Button
            color="primary"
            fullWidth
            startIcon={icon}
            sx={{
                justifyContent: "flex-start",
                "& + &": {
                    mt: 2,
                },
            }}
            variant="outlined"
            {...other}
        >
            {children}
        </Button>
    )
}

export const EmailCancel: FC<EmailActionProps> = (props) => {
    const { icon, children, ...other } = props

    return (
        <Button
            color="error"
            fullWidth
            startIcon={icon}
            sx={{
                justifyContent: "flex-start",
                "& + &": {
                    mt: 2,
                },
            }}
            variant="outlined"
            {...other}
        >
            {children}
        </Button>
    )
}
