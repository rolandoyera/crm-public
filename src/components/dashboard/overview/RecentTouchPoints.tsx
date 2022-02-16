import { FC } from "react"
import { subHours, formatDistance } from "date-fns"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardHeader from "@mui/material/CardHeader"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { Link as RouterLink } from "react-router-dom"
import ArrowRightIcon from "icons/ArrowRight"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import MailIcon from "@mui/icons-material/Mail"
import Scrollbar from "components/Scrollbar"
import ClockIcon from "icons/Clock"
import { useGetRecentTouchPoints } from "lib/useTouchPoints"
import { Tooltip } from "@mui/material"

const RecentTouchPoints: FC = (props) => {
    const { touches } = useGetRecentTouchPoints()

    return (
        <Card {...props}>
            <CardHeader title="Recent Touch Points" />
            <Scrollbar>
                <List
                    disablePadding
                    sx={{
                        height: {
                            xs: "400px",
                        },
                        px: 1,
                    }}
                >
                    {touches?.map((touch) => (
                        <ListItem
                            key={touch.touchId}
                            divider={true}
                            sx={{
                                display: "flex",
                                height: {
                                    xs: 200,
                                    sm: 100,
                                },
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                },
                            }}
                        >
                            <ListItemAvatar
                                sx={{
                                    pl: {
                                        xs: 1.5,
                                        sm: "unset",
                                    },
                                    pt: {
                                        xs: 1,
                                        sm: "unset",
                                    },
                                }}
                            >
                                {(() => {
                                    switch (touch.pointAction) {
                                        case "Called Client":
                                            return (
                                                <Avatar
                                                    sx={{
                                                        backgroundColor:
                                                            "success.main",
                                                        color: "primary.contrastText",
                                                    }}
                                                >
                                                    <LocalPhoneIcon />
                                                </Avatar>
                                            )
                                        case "Received Client Call":
                                            return (
                                                <Avatar
                                                    sx={{
                                                        backgroundColor:
                                                            "transparent",
                                                        border: "2px solid",
                                                        borderColor:
                                                            "text.secondary",
                                                    }}
                                                >
                                                    <LocalPhoneIcon
                                                        sx={{
                                                            color: "text.primary",
                                                        }}
                                                    />
                                                </Avatar>
                                            )
                                        case "Emailed Client":
                                            return (
                                                <Avatar
                                                    sx={{
                                                        backgroundColor:
                                                            "secondary.dark",
                                                        color: "primary.contrastText",
                                                    }}
                                                >
                                                    <MailIcon />
                                                </Avatar>
                                            )
                                        case "Received Client Email":
                                            return (
                                                <Avatar
                                                    sx={{
                                                        backgroundColor:
                                                            "transparent",
                                                        border: "2px solid",
                                                        borderColor:
                                                            "text.secondary",
                                                    }}
                                                >
                                                    <MailIcon
                                                        sx={{
                                                            color: "text.primary",
                                                        }}
                                                    />
                                                </Avatar>
                                            )
                                        default:
                                            return null
                                    }
                                })()}
                            </ListItemAvatar>
                            <ListItemText>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            mb: 0.4,
                                            justifyContent: {
                                                xs: "center",
                                                sm: "unset",
                                            },
                                        }}
                                    >
                                        <Link
                                            color="inherit"
                                            component={RouterLink}
                                            to={`/dashboard/customers/${touch.customerId}`}
                                            variant="subtitle2"
                                        >
                                            {touch.customerName}
                                        </Link>{" "}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: {
                                                xs: "center",
                                                sm: "unset",
                                            },
                                        }}
                                    >
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                pr: 1,
                                            }}
                                            variant="caption"
                                        >
                                            Action:
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="caption"
                                        >
                                            {touch.pointAction}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: {
                                                xs: "center",
                                                sm: "unset",
                                            },
                                        }}
                                    >
                                        <Tooltip title={touch.note}>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: {
                                                        xs: "20em",
                                                        sm: "24em",
                                                    },
                                                    pr: 1,
                                                    cursor: "pointer",
                                                }}
                                                variant="caption"
                                            >
                                                {touch.note}
                                            </Typography>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </ListItemText>
                            <ListItemText>
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        display: "flex",
                                        alignItems: {
                                            xs: "center",
                                            sm: "flex-end",
                                        },
                                    }}
                                >
                                    <Box sx={{ mb: 0.4 }}>
                                        <Typography
                                            color="textSecondary"
                                            variant="caption"
                                        >
                                            User:{" "}
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="caption"
                                        >
                                            {touch.user}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "right",
                                        }}
                                    >
                                        <ClockIcon
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: ".95rem",
                                            }}
                                        />
                                        <Typography
                                            color="textSecondary"
                                            variant="caption"
                                            sx={{ ml: 1 }}
                                        >
                                            {formatDistance(
                                                subHours(
                                                    new Date(
                                                        touch?.createdAt
                                                            .seconds * 1000
                                                    ),
                                                    0
                                                ),
                                                new Date(),
                                                { addSuffix: true }
                                            )}
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Scrollbar>
            <CardActions
                sx={{
                    backgroundColor: "background.default",
                    p: 2,
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    variant="outlined"
                    component={RouterLink}
                    to={`/dashboard/customers`}
                >
                    View All Customers
                </Button>
            </CardActions>
        </Card>
    )
}

export default RecentTouchPoints
