import { FC, useCallback, useEffect, useState } from "react"
import { subHours, formatDistance } from "date-fns"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
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
import { fireDb } from "lib/firebase"
import useMounted from "hooks/useMounted"
import ArrowRightIcon from "icons/ArrowRight"
import Scrollbar from "components/Scrollbar"
import ClockIcon from "icons/Clock"

const RecentProspects: FC = (props) => {
    const [prospects, setProspects] = useState([])
    const mounted = useMounted()
    const getData = useCallback(async () => {
        try {
            await fireDb
                .collectionGroup("customers")
                .orderBy("createdAt", "desc")
                .where("isLost", "==", false)
                .where("isProspect", "==", true)
                .limit(10)
                .onSnapshot((snap) => {
                    const setDocuments = []
                    snap.forEach((doc) => {
                        setDocuments.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setProspects(setDocuments)
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }, [mounted, setProspects])

    useEffect(() => {
        getData()
    }, [getData])

    const handleUnread = async (prospect) => {
        if (prospect.unread === true) {
            await fireDb.collection("customers").doc(prospect.id).set(
                {
                    unread: false,
                },
                { merge: true }
            )
        } else {
            return null
        }
    }

    return (
        <Card {...props}>
            <CardHeader title="Recent Prospects" />
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
                    {prospects?.map((prospect) => (
                        <ListItem
                            key={prospect.id}
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
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        backgroundColor: "primary.main",
                                        color: "primary.contrastText",
                                        mt: {
                                            xs: 1.8,
                                            sm: 0,
                                        },
                                        ml: {
                                            xs: 1,
                                            sm: "unset",
                                        },
                                    }}
                                />
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
                                            onClick={() =>
                                                handleUnread(prospect)
                                            }
                                            to={`/dashboard/customers/${prospect.id}`}
                                            variant="subtitle2"
                                        >
                                            {prospect.holderFirstName +
                                                " " +
                                                prospect.holderLastName}
                                        </Link>{" "}
                                        {prospect.unread ? (
                                            <Badge
                                                color="error"
                                                sx={{
                                                    ".MuiBadge-badge": {
                                                        right: -16,
                                                        top: 11,
                                                    },
                                                }}
                                                variant="dot"
                                            />
                                        ) : null}
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
                                            Policy Interest:
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="caption"
                                        >
                                            {" "}
                                            {prospect.policyInterest}
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
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                pr: 1,
                                            }}
                                            variant="caption"
                                        >
                                            Last Contact:
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="caption"
                                        >
                                            {" "}
                                            {prospect.lastContact
                                                ? formatDistance(
                                                      subHours(
                                                          new Date(
                                                              prospect
                                                                  ?.lastContact
                                                                  .seconds *
                                                                  1000
                                                          ),
                                                          0
                                                      ),
                                                      new Date(),
                                                      {
                                                          addSuffix: true,
                                                      }
                                                  )
                                                : "Never"}
                                        </Typography>
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
                                    <Typography
                                        color="textSecondary"
                                        variant="caption"
                                        sx={{ mb: 0.4 }}
                                    >
                                        Source: {prospect.source}
                                    </Typography>
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
                                                        prospect?.createdAt
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
                    to={`/dashboard/customers/prospects`}
                >
                    View All Prospects
                </Button>
            </CardActions>
        </Card>
    )
}

export default RecentProspects
