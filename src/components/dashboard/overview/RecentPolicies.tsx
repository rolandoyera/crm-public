import { FC } from "react"
import { subHours, formatDistance } from "date-fns"
import FavoriteIcon from "@mui/icons-material/Favorite"
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
import ClockIcon from "icons/Clock"
import ArrowRightIcon from "icons/ArrowRight"
import Scrollbar from "components/Scrollbar"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import VerifiedIcon from "@mui/icons-material/Verified"
import { useGetPoliciesCreatedAt } from "lib/useFirestore"

const RecentPolicies: FC = (props) => {
    const { policies } = useGetPoliciesCreatedAt()

    return (
        <Card {...props}>
            <CardHeader title="Recent Policies" />
            <Scrollbar>
                <List
                    disablePadding
                    sx={{
                        height: {
                            xs: "480px",
                            sm: "400px",
                        },
                        px: 1,
                    }}
                >
                    {policies?.map((policy) => {
                        return (
                            <Box key={policy.id}>
                                <ListItem
                                    divider={true}
                                    sx={{
                                        height: {
                                            xs: 160,
                                            sm: 80,
                                        },
                                        px: 1,
                                        pt: {
                                            xs: 2,
                                        },
                                        display: "flex",
                                        flexDirection: {
                                            xs: "column",
                                            sm: "row",
                                        },
                                        alignItems: {
                                            xs: "center",
                                        },
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <ListItemAvatar
                                        sx={{
                                            pl: {
                                                xs: 1,
                                                sm: 0,
                                            },
                                        }}
                                    >
                                        {(() => {
                                            switch (policy.policyType) {
                                                case "Health":
                                                    return (
                                                        <Avatar
                                                            sx={{
                                                                backgroundColor:
                                                                    "primary.main",
                                                                color: "primary.contrastText",
                                                            }}
                                                        >
                                                            <FavoriteIcon />
                                                        </Avatar>
                                                    )
                                                case "Life":
                                                    return (
                                                        <Avatar
                                                            sx={{
                                                                backgroundColor:
                                                                    "success.main",
                                                                color: "primary.contrastText",
                                                            }}
                                                        >
                                                            <AccessibilityNewIcon />
                                                        </Avatar>
                                                    )
                                                default:
                                                    return null
                                            }
                                        })()}
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: {
                                                    xs: "center",
                                                    sm: "unset",
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    mb: 0.4,
                                                }}
                                            >
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to={`/dashboard/customers/${policy.customerId}`}
                                                    variant="subtitle2"
                                                >
                                                    {policy.holderFirstName +
                                                        " " +
                                                        policy.holderLastName}
                                                </Link>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        pr: {
                                                            xs: 0,
                                                            sm: 1,
                                                        },
                                                    }}
                                                    variant="caption"
                                                >
                                                    {policy.policyType}
                                                    {": "}
                                                </Typography>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="caption"
                                                >
                                                    {policy.policyCarrier}
                                                </Typography>
                                                {policy.isVerified === true ? (
                                                    <VerifiedIcon
                                                        sx={{
                                                            ml: 0.5,
                                                            fontSize: "14px",
                                                        }}
                                                        fontSize="small"
                                                        color={"success"}
                                                    />
                                                ) : (
                                                    <VerifiedIcon
                                                        sx={{
                                                            ml: 0.5,
                                                            fontSize: "14px",
                                                        }}
                                                        fontSize="small"
                                                        color={"error"}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </ListItemText>
                                    <ListItemText>
                                        <Box
                                            sx={{
                                                alignItems: "flex-end",
                                                display: "flex",
                                                height: "100%",
                                                justifyContent: "right",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    alignItems: "center",
                                                    display: "flex",
                                                }}
                                            >
                                                <ClockIcon
                                                    sx={{
                                                        color: "text.secondary",
                                                        fontSize: "1rem",
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
                                                                policy
                                                                    ?.createdAt
                                                                    .seconds *
                                                                    1000
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
                            </Box>
                        )
                    })}
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
                    to={`/dashboard/customers/policies`}
                >
                    View All Policies
                </Button>
            </CardActions>
        </Card>
    )
}

export default RecentPolicies
