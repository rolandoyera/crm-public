import type { FC, ReactElement, ReactNode } from "react"
import { Button } from "@mui/material"
import type { ButtonProps } from "@mui/material"

interface CallModalActionProps extends ButtonProps {
    icon?: ReactElement
    children?: ReactNode
    onClick?: (values: any) => void
}

export const CallModalAction: FC<CallModalActionProps> = (props) => {
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

export const CallModalCancel: FC<CallModalActionProps> = (props) => {
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
