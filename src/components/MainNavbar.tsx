import type { FC } from "react"
import PropTypes from "prop-types"
import { Link as RouterLink } from "react-router-dom"
import {
    AppBar,
    Box,
    Button,
    Divider,
    IconButton,
    Toolbar,
} from "@mui/material"
import MenuIcon from "../icons/Menu"
import { Company } from "lib/constants"

interface MainNavbarProps {
    onSidebarMobileOpen?: () => void
}

const MainNavbar: FC<MainNavbarProps> = (props) => {
    const { onSidebarMobileOpen } = props

    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "background.paper",
                color: "text.secondary",
            }}
        >
            <Toolbar sx={{ minHeight: 64 }}>
                <IconButton
                    color="inherit"
                    onClick={onSidebarMobileOpen}
                    sx={{
                        display: {
                            md: "none",
                        },
                    }}
                >
                    <MenuIcon fontSize="small" />
                </IconButton>
                <RouterLink to="/">
                    <img
                        style={{ marginTop: "6px" }}
                        src={`${Company.url}/static/royalty-shield.png`}
                        alt="Company Logo"
                        width={35}
                        height={35}
                    />
                </RouterLink>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        alignItems: "center",
                        display: {
                            md: "flex",
                            xs: "none",
                        },
                    }}
                >
                    <Divider
                        orientation="vertical"
                        sx={{
                            height: 32,
                            mx: 2,
                        }}
                    />
                    <Button
                        color="primary"
                        component={RouterLink}
                        to="/dashboard"
                        size="small"
                        variant="contained"
                    >
                        Customer Portal
                    </Button>
                </Box>
            </Toolbar>
            <Divider />
        </AppBar>
    )
}

MainNavbar.propTypes = {
    onSidebarMobileOpen: PropTypes.func,
}

export default MainNavbar
