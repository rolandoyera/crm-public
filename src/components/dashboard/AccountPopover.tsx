import { useRef, useState } from "react"
import type { FC } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Typography,
} from "@mui/material"
import useAuth from "../../hooks/useAuth"
import CogIcon from "../../icons/Cog"
import UserIcon from "../../icons/User"
import { firebaseAuth } from "lib/firebase"
import { Company } from "lib/constants"
import getInitials from "utils/getInitials"

const AccountPopover: FC = () => {
    const user = firebaseAuth.currentUser
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleLogout = async (): Promise<void> => {
        try {
            handleClose()
            await logout()
            navigate("/")
        } catch (err) {
            console.error(err)
            toast.error("Unable to logout.")
        }
    }

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpen}
                ref={anchorRef}
                sx={{
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <Avatar
                    src={user.photoURL}
                    sx={{
                        height: 36,
                        width: 36,
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        fontSize: "1rem",
                        fontWeight: 500,
                    }}
                >
                    {user.displayName ? getInitials(user.displayName) : null}
                </Avatar>
            </Box>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
                keepMounted
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: { width: 240 },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography color="textPrimary" variant="subtitle2">
                        {Company.name}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                        {user.displayName}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ mt: 2 }}>
                    <MenuItem
                        component={RouterLink}
                        to="/dashboard/social/profile"
                    >
                        <ListItemIcon>
                            <UserIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Profile
                                </Typography>
                            }
                        />
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/dashboard/account">
                        <ListItemIcon>
                            <CogIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Settings
                                </Typography>
                            }
                        />
                    </MenuItem>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        color="primary"
                        fullWidth
                        onClick={handleLogout}
                        variant="outlined"
                    >
                        Logout
                    </Button>
                </Box>
            </Popover>
        </>
    )
}

export default AccountPopover
