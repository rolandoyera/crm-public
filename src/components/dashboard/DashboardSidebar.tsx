import { useEffect } from "react"
import type { FC } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Avatar, Box, Divider, Drawer, Link, Typography } from "@mui/material"
import type { Theme } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import CalendarIcon from "icons/Calendar"
import ChartPieIcon from "icons/ChartPie"
import ChartSquareBarIcon from "icons/ChartSquareBar"
import ClipboardListIcon from "icons/ClipboardList"
import MailIcon from "icons/Mail"
import ShoppingBagIcon from "icons/ShoppingBag"
import UserIcon from "icons/User"
import UsersIcon from "icons/Users"
import { Company } from "lib/constants"
import NavSection from "../NavSection"
import Scrollbar from "../Scrollbar"
import { firebaseAuth } from "lib/firebase"

interface DashboardSidebarProps {
    onMobileClose: () => void
    openMobile: boolean
}

const sections = [
    {
        title: "General",
        items: [
            {
                title: "Overview",
                path: "/dashboard",
                icon: <ChartSquareBarIcon fontSize="small" />,
            },
            {
                title: "Analytics",
                path: "/dashboard/analytics",
                icon: <ChartPieIcon fontSize="small" />,
            },
            {
                title: "Finance",
                path: "/dashboard/finance",
                icon: <ShoppingBagIcon fontSize="small" />,
            },
            {
                title: "Account",
                path: "/dashboard/account",
                icon: <UserIcon fontSize="small" />,
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Customers",
                path: "/dashboard/customers",
                icon: <UsersIcon fontSize="small" />,
                children: [
                    {
                        title: "All",
                        path: "/dashboard/customers",
                    },
                    {
                        title: "Search",
                        path: "/dashboard/customers/search",
                    },
                    {
                        title: "Prospects",
                        path: "/dashboard/customers/prospects",
                    },
                    {
                        title: "Clients",
                        path: "/dashboard/customers/clients",
                    },
                    {
                        title: "Policies",
                        path: "/dashboard/customers/policies",
                    },
                    {
                        title: "Lost",
                        path: "/dashboard/customers/lost",
                    },
                    {
                        title: "Add A Prospect",
                        path: "/dashboard/customers/add",
                    },
                ],
            },
        ],
    },

    {
        title: "Apps",
        items: [
            {
                title: "Kanban",
                path: "",
                // path: "/dashboard/kanban",
                icon: <ClipboardListIcon fontSize="small" />,
            },
            {
                title: "Mail",
                path: "#",
                // path: "/dashboard/mail",
                icon: <MailIcon fontSize="small" />,
            },
            {
                title: "Calendar",
                path: "#",
                // path: "/dashboard/calendar",
                icon: <CalendarIcon fontSize="small" />,
            },
        ],
    },
]

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
    const { onMobileClose, openMobile } = props
    const location = useLocation()
    const user = firebaseAuth.currentUser
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"))

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose()
        }
        // eslint-disable-next-line
    }, [location.pathname])

    const content = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Scrollbar options={{ suppressScrollX: true }}>
                <Box
                    sx={{
                        display: {
                            xl: "none",
                            xs: "flex",
                        },
                        justifyContent: "center",
                        p: 2,
                    }}
                >
                    <RouterLink to="/">
                        <img
                            style={{ marginTop: "6px" }}
                            src={`${Company.url}/static/royalty-shield.png`}
                            alt="Company Logo"
                            width={35}
                            height={35}
                        />
                    </RouterLink>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Box
                        sx={{
                            alignItems: "center",
                            backgroundColor: "background.default",
                            borderRadius: 1,
                            display: "flex",
                            overflow: "hidden",
                            p: 2,
                        }}
                    >
                        <RouterLink to="/dashboard/account">
                            <Avatar
                                src={user.photoURL}
                                sx={{
                                    cursor: "pointer",
                                    height: 48,
                                    width: 48,
                                }}
                            />
                        </RouterLink>
                        <Box sx={{ ml: 2 }}>
                            <Typography color="textPrimary" variant="subtitle2">
                                {!user.displayName ? null : user.displayName}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                Your plan:{" "}
                                <Link
                                    color="primary"
                                    component={RouterLink}
                                    to="/pricing"
                                >
                                    Premium
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    {sections.map((section) => (
                        <NavSection
                            key={section.title}
                            pathname={location.pathname}
                            sx={{
                                "& + &": {
                                    mt: 3,
                                },
                            }}
                            {...section}
                        />
                    ))}
                </Box>
            </Scrollbar>
        </Box>
    )

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "background.paper",
                        height: "calc(100% - 64px) !important",
                        top: "64px !Important",
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        )
    }

    return (
        <Drawer
            anchor="left"
            onClose={onMobileClose}
            open={openMobile}
            PaperProps={{
                sx: {
                    backgroundColor: "background.paper",
                    width: 280,
                },
            }}
            variant="temporary"
        >
            {content}
        </Drawer>
    )
}

export default DashboardSidebar
