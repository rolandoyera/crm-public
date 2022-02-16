import type { FC, ReactElement, ReactNode } from "react"
import { Button } from "@mui/material"
import type { ButtonProps } from "@mui/material"

interface ApplicationModalActionProps extends ButtonProps {
    icon?: ReactElement
    children?: ReactNode
}

const ApplicationModalAction: FC<ApplicationModalActionProps> = (props) => {
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

export default ApplicationModalAction
