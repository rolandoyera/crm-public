import { FC, useCallback, useEffect, useState } from "react"
import { subHours, formatDistance } from "date-fns"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardHeader from "@mui/material/CardHeader"
import IconButton from "@mui/material/IconButton"
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
import StarIcon from "@mui/icons-material/Star"
import { Tooltip } from "@mui/material"

const Important: FC = (props) => {
    const [customers, setCustomers] = useState([])
    const mounted = useMounted()

    const getData = useCallback(async () => {
        try {
            await fireDb
                .collection("customers")
                .where("following", "==", 1)
                .onSnapshot((snap) => {
                    const setDocuments = []
                    snap.forEach((doc) => {
                        setDocuments.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setCustomers(setDocuments)
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }, [mounted, setCustomers])

    useEffect(() => {
        getData()
    }, [getData])

    const handleFollow = async (customer) => {
        try {
            await fireDb.collection("customers").doc(customer.id).update({
                following: 0,
                merge: true,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card {...props}>
            <CardHeader title="Important" />
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
                    {customers?.map((customer, i) => (
                        <ListItem
                            key={i}
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
                                    ml: {
                                        xs: 3,
                                        sm: "unset",
                                    },
                                }}
                            >
                                <Tooltip title={"Remove from list"}>
                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                        onClick={() => handleFollow(customer)}
                                    >
                                        <StarIcon
                                            fontSize="medium"
                                            color="warning"
                                        />
                                    </IconButton>
                                </Tooltip>
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
                                            onClick={() => {}}
                                            to={`/dashboard/customers/${customer.id}`}
                                            variant="subtitle2"
                                        >
                                            {customer.holderFirstName +
                                                " " +
                                                customer.holderLastName}
                                        </Link>
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
                                            Tasks:
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="caption"
                                        >
                                            {customer.task ? customer.task : 0}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                pl: 1,
                                            }}
                                            variant="caption"
                                        ></Typography>
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                pl: 1,
                                            }}
                                            variant="caption"
                                        >
                                            Notes:
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            sx={{
                                                pl: 1,
                                            }}
                                            variant="caption"
                                        >
                                            {customer.notes
                                                ? customer.notes
                                                : 0}
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
                                            {customer.lastContact
                                                ? formatDistance(
                                                      subHours(
                                                          new Date(
                                                              customer
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
                                    <Box>
                                        <Typography
                                            color="textSecondary"
                                            variant="caption"
                                            sx={{ mb: 0.4 }}
                                        >
                                            Type:
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="caption"
                                            sx={{ mb: 0.4, ml: 1 }}
                                        >
                                            {customer.isProspect === true
                                                ? "Prospect"
                                                : "Client"}
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
                                                        customer?.createdAt
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

export default Important
