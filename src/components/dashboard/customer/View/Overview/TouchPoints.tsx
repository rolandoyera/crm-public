import Box from "@mui/material/Box"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import PlusIcon from "icons/Plus"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import MailIcon from "@mui/icons-material/Mail"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Scrollbar from "components/Scrollbar"

const TouchPoints = ({ touches, customer, handleOpen }) => {
    return (
        <Card>
            <CardHeader title={"Touch Points"} sx={{ mt: 0.4 }} />
            <Divider />
            <Scrollbar>
                <Box
                    sx={{
                        height: "391px",
                        display: "flex",
                        mb: 0,
                        pb: 0,
                    }}
                >
                    <CardContent
                        sx={{
                            width: "100%",
                            pt: 0,
                        }}
                    >
                        <Timeline sx={{ p: 0 }} className="fade-in-full">
                            {touches.map((touch, i) => (
                                <TimelineItem key={i}>
                                    <TimelineSeparator>
                                        {(() => {
                                            switch (touch.pointAction) {
                                                case "Called Client":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "success.main",
                                                            }}
                                                        >
                                                            <LocalPhoneIcon
                                                                sx={{
                                                                    color: "textSecondary",
                                                                }}
                                                            />
                                                        </TimelineDot>
                                                    )
                                                case "Received Client Call":
                                                    return (
                                                        <TimelineDot variant="outlined">
                                                            <LocalPhoneIcon
                                                                sx={{
                                                                    color: "textSecondary",
                                                                }}
                                                            />
                                                        </TimelineDot>
                                                    )
                                                case "Emailed Client":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "secondary.dark",
                                                            }}
                                                        >
                                                            <MailIcon />
                                                        </TimelineDot>
                                                    )
                                                case "Received Client Email":
                                                    return (
                                                        <TimelineDot variant="outlined">
                                                            <MailIcon
                                                                sx={{
                                                                    color: "textSecondary",
                                                                }}
                                                            />
                                                        </TimelineDot>
                                                    )
                                                default:
                                                    return null
                                            }
                                        })()}

                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent
                                        sx={{
                                            mt: "3rem",
                                            py: 2,
                                            ml: ".7rem",
                                            minHeight: "100px",
                                            backgroundColor:
                                                "background.default",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            flexDirection: "column",
                                            borderRadius: 1.5,
                                            position: "relative",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "10px",
                                                height: "10px",
                                                position: "absolute",
                                                backgroundColor:
                                                    "background.default",
                                                transform: "rotate(45deg)",
                                                left: -5,
                                                top: 25,
                                            }}
                                        ></Box>
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                            }}
                                            color="textSecondary"
                                            variant="subtitle2"
                                        >
                                            {new Date(
                                                touch?.createdAt?.seconds * 1000
                                            ).toLocaleDateString([], {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}{" "}
                                            at{" "}
                                            {new Date(
                                                touch?.createdAt?.seconds * 1000
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </Typography>
                                        <Typography
                                            mr={1}
                                            color="textPrimary"
                                            variant="subtitle2"
                                        >
                                            {touch.pointNumber ||
                                                touch.pointEmail}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: {
                                                    xs: "column",
                                                    sm: "unset",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    marginBottom: {
                                                        xs: 0,
                                                        sm: 1,
                                                    },
                                                }}
                                                mr={1}
                                                color="textPrimary"
                                                variant="subtitle2"
                                            >
                                                {touch.pointAction} -
                                            </Typography>
                                            <Typography
                                                mb={1}
                                                fontStyle={"italic"}
                                                fontWeight={300}
                                                color="textPrimary"
                                                variant="subtitle2"
                                            >
                                                {touch.user}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            color="textSecondary"
                                            variant="subtitle2"
                                        >
                                            {touch.note}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color={"success"}>
                                        <AccountCircleIcon />
                                    </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent
                                    sx={{
                                        mt: 6,
                                        minHeight: "100px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            mr: ".75rem",
                                            fontSize: "12px",
                                        }}
                                        color="textSecondary"
                                        variant="subtitle2"
                                    >
                                        {new Date(
                                            customer?.createdAt?.seconds * 1000
                                        ).toLocaleDateString([], {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}{" "}
                                        at{" "}
                                        {new Date(
                                            customer?.createdAt?.seconds * 1000
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </Typography>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography
                                            mr={1}
                                            color="textPrimary"
                                            variant="subtitle2"
                                        >
                                            Lead Created -
                                        </Typography>
                                        <Typography
                                            mb={1}
                                            fontStyle={"italic"}
                                            fontWeight={300}
                                            color="textPrimary"
                                            variant="subtitle2"
                                        >
                                            {customer.createdBy}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        color="textSecondary"
                                        variant="subtitle2"
                                    >
                                        Source - {customer.source}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </CardContent>
                </Box>
            </Scrollbar>
            <BottomNavigation showLabels>
                <BottomNavigationAction
                    className="bottom-nav"
                    label="Add Touch Point"
                    onClick={handleOpen}
                    icon={<PlusIcon color="primary" fontSize="small" />}
                />
            </BottomNavigation>
        </Card>
    )
}

export default TouchPoints
