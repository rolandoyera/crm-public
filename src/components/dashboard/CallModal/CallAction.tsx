import type { FC, ReactElement, ReactNode } from "react"
import PropTypes from "prop-types"
import { Button } from "@mui/material"
import type { ButtonProps } from "@mui/material"

interface CallActionProps extends ButtonProps {
    icon?: ReactElement
    children?: ReactNode
}

const CallAction: FC<CallActionProps> = (props) => {
    const { icon, children, ...other } = props

    return (
        <Button
            color="success"
            fullWidth
            startIcon={icon}
            sx={{
                justifyContent: "flex-start",
                "& + &": {
                    mt: 2,
                },
            }}
            variant="contained"
            {...other}
        >
            {children}
        </Button>
    )
}

CallAction.propTypes = {
    icon: PropTypes.element,
    children: PropTypes.node,
}

export default CallAction
