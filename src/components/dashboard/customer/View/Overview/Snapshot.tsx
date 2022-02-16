import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Link,
    Tooltip,
} from "@mui/material"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import BottomNavigation from "@mui/material/BottomNavigation"
import Rating from "@mui/material/Rating"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import { StyledMenu } from "../LifePolicyView/StyledMenu"
import NotInterestedIcon from "@mui/icons-material/NotInterested"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Link as RouterLink } from "react-router-dom"
import PlusIcon from "icons/Plus"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import SendIcon from "@mui/icons-material/Send"
import kFormatter from "lib/kFormatter"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import PhoneIcon from "@mui/icons-material/Phone"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import HomeIcon from "@mui/icons-material/Home"
import EditIcon from "@mui/icons-material/Edit"
import { useEffect, useState } from "react"
import { fireDb } from "lib/firebase"
import toast from "react-hot-toast"

const Snapshot = ({
    handleOpenMenu,
    customer,
    openMoreMenu,
    handleCloseMenu,
    moreAnchorEl,
    handleConversion,
    handleIsLost,
    handleOpenCall,
    policies,
    id,
    touches,
    handleOpenEmail,
}) => {
    const [isLoading, setIsloading] = useState(true)
    const [isLoading2, setIsloading2] = useState(true)
    const [following, setFollowing] = useState(0)
    const handleChange = (event): void => {
        if (!following) {
            setFollowing(1)
        } else {
            setFollowing(0)
        }
    }
    const handleFollow = async () => {
        if (!following) {
            try {
                await fireDb.collection("customers").doc(id).update({
                    following: 1,
                })
            } catch (error) {
                console.error(error)
                toast.error("There Was An Error. Please Try Again")
            }
        } else if (following === 1) {
            try {
                await fireDb.collection("customers").doc(id).update({
                    following: 0,
                })
            } catch (error) {
                console.error(error)
                toast.error("There Was An Error. Please Try Again")
            }
        }
    }

    const dob = new Date(customer.holderDOB)
    const month_diff = Date.now() - dob.getTime()
    const age_dt = new Date(month_diff)
    const year = age_dt.getUTCFullYear()
    const age = Math.abs(year - 1970)

    useEffect(() => {
        setFollowing(customer.following)
        const timer = setTimeout(() => {
            setIsloading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [customer.following])

    useEffect(() => {
        const timer2 = setTimeout(() => {
            setIsloading2(false)
        }, 550)
        return () => clearTimeout(timer2)
    }, [])

    return (
        <Card>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pl: 2,
                    pt: 1.5,
                    pr: 2,
                    pb: 1.5,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Tooltip
                        title={`${
                            customer?.following > 0 ? "Remove" : "Important"
                        }`}
                    >
                        <Rating
                            max={1}
                            value={following || 0}
                            name="following"
                            onChange={handleChange}
                            onClick={handleFollow}
                            sx={{ pt: 0, pr: 1 }}
                        />
                    </Tooltip>
                    <Box>
                        {isLoading2 === false ? (
                            <Box
                                className="fade-in-full"
                                sx={{ display: "flex" }}
                            >
                                <Typography variant="h6">
                                    {customer.holderFirstName}{" "}
                                    {customer.holderMiddleName}{" "}
                                    {customer.holderLastName}{" "}
                                </Typography>
                                {customer.isProspect === true ? (
                                    <Chip
                                        sx={{
                                            ml: 1.5,
                                            height: "20px",
                                            fontSize: ".65rem",
                                            fontWeight: 600,
                                            "& span": {
                                                marginTop: "0px",
                                            },
                                        }}
                                        color="primary"
                                        label={"prospect"}
                                    />
                                ) : (
                                    <Chip
                                        sx={{
                                            ml: 1,
                                            height: "20px",
                                            fontSize: ".65rem",
                                            fontWeight: 600,
                                            "& span": {
                                                marginTop: "0px",
                                            },
                                        }}
                                        color="success"
                                        label={"client"}
                                    />
                                )}
                                {customer.isLost === true ? (
                                    <Chip
                                        sx={{
                                            ml: 1,
                                            height: "20px",
                                            fontSize: ".65rem",
                                            fontWeight: 600,
                                            "& span": {
                                                marginTop: "0px",
                                            },
                                        }}
                                        color="error"
                                        label={"lost"}
                                    />
                                ) : null}
                            </Box>
                        ) : null}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "30px",
                    }}
                >
                    <Box
                        sx={{
                            ml: "auto",
                            mr: 2,
                            width: "28px",
                            mt: -0.1,
                        }}
                    >
                        <IconButton
                            aria-label="More Options"
                            id="more-options"
                            aria-controls="more-options"
                            aria-haspopup="true"
                            aria-expanded={openMoreMenu ? "true" : undefined}
                            onClick={handleOpenMenu}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <StyledMenu
                id="more-options"
                open={openMoreMenu}
                onClose={handleCloseMenu}
                anchorEl={moreAnchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={handleConversion}
                    disabled={customer.isLost === true ? true : false}
                >
                    <AccountCircleIcon
                        color="primary"
                        sx={{ marginRight: 1.5 }}
                    />
                    {customer.isCustomer === false ? (
                        <Typography
                            color="textSecondary"
                            sx={{
                                fontSize: ".85rem",
                                fontWeight: 600,
                            }}
                        >
                            Convert to client
                        </Typography>
                    ) : (
                        <Typography
                            color="textSecondary"
                            sx={{
                                fontSize: ".85rem",
                                fontWeight: 600,
                            }}
                        >
                            Change to prospect
                        </Typography>
                    )}
                </MenuItem>
                <MenuItem onClick={handleIsLost}>
                    {customer.isLost === false ? (
                        <>
                            <NotInterestedIcon
                                color="error"
                                sx={{ marginRight: 1.5 }}
                            />
                            <Typography
                                color="textSecondary"
                                sx={{
                                    fontSize: ".85rem",
                                    fontWeight: 600,
                                }}
                            >
                                Mark as lost
                            </Typography>
                        </>
                    ) : (
                        <>
                            <CheckCircleOutlineIcon
                                color="success"
                                sx={{ marginRight: 1.5 }}
                            />
                            <Typography
                                color="textSecondary"
                                sx={{
                                    fontSize: ".85rem",
                                    fontWeight: 600,
                                }}
                            >
                                Mark as Active
                            </Typography>
                        </>
                    )}
                </MenuItem>
            </StyledMenu>
            <Divider />
            <CardContent className="fade-in-full">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minHeight: "160px",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                    }}
                >
                    {isLoading2 === false ? (
                        <>
                            <Box className="fade-in-full">
                                {customer.holderAddress ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            mb: 0.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                            }}
                                        >
                                            <HomeIcon
                                                sx={{
                                                    fontSize: "1.1rem",
                                                    mr: 1,
                                                    mt: 0.5,
                                                }}
                                            />
                                            <Box>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="body1"
                                                >
                                                    {customer.holderAddress}{" "}
                                                    <br />
                                                    {customer.holderCity + ", "}
                                                    {customer.holderState + " "}
                                                    {customer.holderZip + " "}
                                                    <br />
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Link
                                            ml={3.4}
                                            color={"warning.main"}
                                            variant="caption"
                                            underline="hover"
                                            href={`https://www.google.com/maps/place/${customer.holderAddress}+${customer.holderCity}+${customer.holderState}+${customer.holderZip}`}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            {customer.holderAddress
                                                ? "google maps"
                                                : null}
                                        </Link>
                                    </Box>
                                ) : null}
                                {customer.holderPhoneNumber ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 0.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mr: 1,
                                            }}
                                        >
                                            <PhoneIphoneIcon
                                                sx={{ fontSize: "1.1rem" }}
                                            />
                                        </Box>
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            {customer.holderPhoneNumber}
                                        </Typography>
                                    </Box>
                                ) : null}
                                {customer.holderAltPhoneNumber ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mr: 1,
                                            }}
                                        >
                                            <PhoneIcon
                                                sx={{ fontSize: ".85rem" }}
                                            />
                                        </Box>
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            {customer.holderAltPhoneNumber}
                                        </Typography>
                                    </Box>
                                ) : null}
                                {customer.holderEmail ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mr: 1,
                                            }}
                                        >
                                            <SendIcon
                                                sx={{ fontSize: ".85rem" }}
                                            />
                                        </Box>
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            {customer.holderEmail}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Box>
                            <Box
                                sx={{
                                    mt: {
                                        xs: 2,
                                        sm: "unset",
                                    },
                                    display: {
                                        xs: "flex",
                                        sm: "unset",
                                    },
                                    justifyContent: {
                                        xs: "space-evenly",
                                        sm: "unset",
                                    },
                                }}
                            >
                                <Box sx={{ mb: 1 }}>
                                    <Button
                                        disabled={
                                            customer.holderPhoneNumber
                                                ? false
                                                : true
                                        }
                                        variant="contained"
                                        onClick={handleOpenCall}
                                        startIcon={<LocalPhoneIcon />}
                                    >
                                        Make a Call
                                    </Button>
                                </Box>
                                <Box>
                                    <Button
                                        disabled={
                                            customer.holderEmail ? false : true
                                        }
                                        variant="contained"
                                        href={`mailto: ${customer.holderEmail}`}
                                        onClick={handleOpenEmail}
                                        startIcon={<SendIcon />}
                                    >
                                        Send Email
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    ) : null}
                </Box>
                <Box
                    sx={{
                        mt: 10,
                        backgroundColor: "background.default",
                        height: "120px",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {isLoading === false ? (
                        <>
                            <Box
                                sx={{
                                    width: {
                                        xs: "50%",
                                        md: "33.33333%",
                                    },
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    borderRight: (theme) =>
                                        `1px dashed ${theme.palette.divider}`,
                                }}
                            >
                                {customer.isCustomer === true ? (
                                    <>
                                        <Typography
                                            sx={{ mb: 3 }}
                                            color="textSecondary"
                                            variant="subtitle2"
                                        >
                                            Policies
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            {policies.length}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography
                                            sx={{ mb: 3 }}
                                            color="textSecondary"
                                            variant="subtitle2"
                                        >
                                            Interest
                                        </Typography>
                                        {(() => {
                                            switch (customer.policyInterest) {
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
                                    </>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    width: {
                                        xs: "50%",
                                        md: "33.33333%",
                                    },
                                    display: {
                                        xs: "none",
                                        sm: "flex",
                                    },
                                    alignItems: "center",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    borderRight: (theme) =>
                                        `1px dashed ${theme.palette.divider}`,
                                }}
                            >
                                <Typography
                                    sx={{ mb: 3, textAlign: "center" }}
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Income
                                </Typography>
                                <Typography color="textPrimary" variant="h4">
                                    {customer.householdIncome
                                        ? `$${kFormatter(
                                              customer.householdIncome
                                          )}`
                                        : "$0"}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: {
                                        xs: "50%",
                                        md: "33.33333%",
                                    },
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography
                                    sx={{ mb: 3 }}
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Age
                                </Typography>
                                <Typography color="textPrimary" variant="h4">
                                    {age}
                                </Typography>
                            </Box>{" "}
                        </>
                    ) : null}
                </Box>
            </CardContent>
            <BottomNavigation showLabels>
                <BottomNavigationAction
                    component={RouterLink}
                    className="bottom-nav"
                    label={`Edit ${
                        customer.isProspect ? "Prospect" : "Client"
                    }`}
                    icon={<EditIcon color="primary" fontSize="small" />}
                    to={`/dashboard/customers/edit-client-details/${id}`}
                />
                {customer.spouse === "Yes" ? (
                    <BottomNavigationAction
                        component={RouterLink}
                        className="bottom-nav"
                        label="Edit Spouse"
                        icon={<EditIcon color="primary" fontSize="small" />}
                        to={`/dashboard/customers/edit-spouse/${id}`}
                    />
                ) : (
                    <BottomNavigationAction
                        component={RouterLink}
                        className="bottom-nav"
                        label="Add Spouse"
                        icon={<PlusIcon color="primary" fontSize="small" />}
                        to={`/dashboard/customers/add-spouse/${id}`}
                    />
                )}
            </BottomNavigation>
        </Card>
    )
}

export default Snapshot
