import { useRef, useState } from "react"
import type { FC } from "react"
import {
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
    Tooltip,
    Typography,
} from "@mui/material"
import BellIcon from "../../icons/Bell"
import { fireDb } from "lib/firebase"
import { Link as RouterLink } from "react-router-dom"
import { useGetCustomersByUnread } from "lib/useFirestore"

const NotificationsPopover: FC = () => {
    const { customers } = useGetCustomersByUnread()
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = (): void => {
        setOpen(true)
    }
    const handleClose = (): void => {
        setOpen(false)
    }
    const handleClick = (x) => {
        fireDb.collection("customers").doc(x.id).set(
            {
                unread: false,
            },
            { merge: true }
        )
        setOpen(false)
    }

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton
                    color="inherit"
                    ref={anchorRef}
                    onClick={handleOpen}
                >
                    <Badge color="error" badgeContent={customers.length}>
                        <BellIcon fontSize="small" />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: { width: 320 },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography color="textPrimary" variant="h6">
                        Notifications
                    </Typography>
                </Box>
                {customers.length === 0 ? (
                    <Box sx={{ p: 2 }}>
                        <Typography color="textPrimary" variant="subtitle2">
                            There are no notifications
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <List disablePadding>
                            {customers.map((x) => {
                                // const Icon = iconsMap[x.type]

                                return (
                                    <ListItem divider key={x.id}>
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{
                                                    backgroundColor:
                                                        "primary.main",
                                                    color: "primary.contrastText",
                                                }}
                                            >
                                                {/* <Icon fontSize="small" /> */}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Link
                                                    component={RouterLink}
                                                    onClick={() =>
                                                        handleClick(x)
                                                    }
                                                    color="textPrimary"
                                                    sx={{ cursor: "pointer" }}
                                                    underline="none"
                                                    variant="subtitle2"
                                                    to={`/dashboard/customers/${x.id}`}
                                                >
                                                    New Lead
                                                </Link>
                                            }
                                            secondary={
                                                x.holderFirstName +
                                                " " +
                                                x.holderLastName
                                            }
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                p: 1,
                            }}
                        >
                            <Button color="primary" size="small" variant="text">
                                View Customers
                            </Button>
                        </Box>
                    </>
                )}
            </Popover>
        </>
    )
}

export default NotificationsPopover
