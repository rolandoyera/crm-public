import {
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@mui/material"
import { useGetEventsByID } from "lib/useFirestore"
import Scrollbar from "components/Scrollbar"
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator,
} from "@mui/lab"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import PersonIcon from "@mui/icons-material/Person"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import DescriptionIcon from "@mui/icons-material/Description"
import FaceIcon from "@mui/icons-material/Face"

const Events = ({ customer, id }) => {
    const { events } = useGetEventsByID(id)

    return (
        <Card>
            <CardHeader
                title={
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="h6">Events</Typography>{" "}
                        <Badge
                            sx={{ ml: 1 }}
                            color="secondary"
                            badgeContent={events.length}
                        ></Badge>
                    </Box>
                }
            />
            <Divider />
            <Scrollbar>
                <Box
                    sx={{
                        height: "372px",
                        display: "flex",
                        mb: 0,
                        pb: 0,
                    }}
                >
                    <CardContent
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Timeline sx={{ px: 0 }}>
                            {events.map((e) => (
                                <TimelineItem key={e.id}>
                                    <TimelineSeparator>
                                        {(() => {
                                            switch (e.type) {
                                                case "Policy":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "primary.light",
                                                            }}
                                                        >
                                                            <DescriptionIcon />
                                                        </TimelineDot>
                                                    )
                                                case "Customer":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "success.light",
                                                            }}
                                                        >
                                                            <PersonIcon />
                                                        </TimelineDot>
                                                    )
                                                case "Customer Lost":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "error.light",
                                                            }}
                                                        >
                                                            <PersonIcon />
                                                        </TimelineDot>
                                                    )
                                                case "Customer Active":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "success.main",
                                                            }}
                                                        >
                                                            <PersonIcon />
                                                        </TimelineDot>
                                                    )
                                                case "Dependent":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "secondary.dark",
                                                            }}
                                                        >
                                                            <FaceIcon />
                                                        </TimelineDot>
                                                    )
                                                case "Spouse":
                                                    return (
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor:
                                                                    "secondary.dark",
                                                            }}
                                                        >
                                                            <PeopleAltIcon />
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
                                            maxWidth: "600px",
                                            backgroundColor:
                                                "background.default",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            flexDirection: "column",
                                            borderRadius: 2,
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
                                                e?.createdAt?.seconds * 1000
                                            ).toLocaleDateString([], {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}{" "}
                                            at{" "}
                                            {new Date(
                                                e?.createdAt?.seconds * 1000
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
                                            {e.action}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                            }}
                                        >
                                            <Typography
                                                mb={1}
                                                mr={1}
                                                color="textPrimary"
                                                variant="subtitle2"
                                            >
                                                {e.pointAction} -
                                            </Typography>
                                            <Typography
                                                mb={1}
                                                fontStyle={"italic"}
                                                fontWeight={300}
                                                color="textPrimary"
                                                variant="subtitle2"
                                            >
                                                {e.user}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            color="textSecondary"
                                            variant="subtitle2"
                                        >
                                            {e.note}
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
                                            Account Created -
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
        </Card>
    )
}

export default Events
