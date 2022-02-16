import { useEffect } from "react"
import type { FC } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import { Box, Button, Drawer } from "@mui/material"
import type { Theme } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Company } from "lib/constants"

interface MainSidebarProps {
    onMobileClose: () => void
    openMobile: boolean
}

const MainSidebar: FC<MainSidebarProps> = (props) => {
    const { onMobileClose, openMobile } = props
    const location = useLocation()
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"))

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose()
        }
        // eslint-disable-next-line
    }, [location.pathname])

    return (
        <Drawer
            anchor="left"
            onClose={onMobileClose}
            open={!lgUp && openMobile}
            variant="temporary"
            PaperProps={{
                sx: {
                    backgroundColor: "background.default",
                    width: 256,
                },
            }}
        >
            <Box
                sx={{
                    alignItems: "flex-start",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
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

                <Button
                    color="primary"
                    component="a"
                    href="/dashboard"
                    size="small"
                    sx={{ mt: 4 }}
                    target="_blank"
                    variant="contained"
                >
                    Login
                </Button>
            </Box>
        </Drawer>
    )
}

MainSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool,
}

export default MainSidebar
