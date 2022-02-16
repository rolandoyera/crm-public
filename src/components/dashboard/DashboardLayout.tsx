import { useState } from "react"
import type { FC, ReactNode } from "react"
import { Outlet } from "react-router-dom"
import { experimentalStyled } from "@mui/material/styles"
import DashboardNavbar from "./DashboardNavbar"
import DashboardSidebar from "./DashboardSidebar"

interface DashboardLayoutProps {
    children?: ReactNode
}

const DashboardLayoutRoot = experimentalStyled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
}))

const DashboardLayoutWrapper = experimentalStyled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: "64px",
    [theme.breakpoints.up("xl")]: {
        paddingLeft: "280px",
    },
}))

const DashboardLayoutContainer = experimentalStyled("div")({
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
})

const DashboardLayoutContent = experimentalStyled("div")({
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    position: "relative",
    WebkitOverflowScrolling: "touch",
})

const DashboardLayout: FC<DashboardLayoutProps> = () => {
    const [isSidebarMobileOpen, setIsSidebarMobileOpen] =
        useState<boolean>(false)

    const sidebarTrigger = () => {
        if (isSidebarMobileOpen === false) {
            setIsSidebarMobileOpen(true)
        } else {
            setIsSidebarMobileOpen(false)
        }
    }

    return (
        <DashboardLayoutRoot>
            <DashboardNavbar
                onSidebarMobileOpen={(): void => sidebarTrigger()}
            />
            <DashboardSidebar
                onMobileClose={(): void => setIsSidebarMobileOpen(false)}
                openMobile={isSidebarMobileOpen}
            />
            <DashboardLayoutWrapper>
                <DashboardLayoutContainer>
                    <DashboardLayoutContent>
                        <Outlet />
                    </DashboardLayoutContent>
                </DashboardLayoutContainer>
            </DashboardLayoutWrapper>
        </DashboardLayoutRoot>
    )
}

export default DashboardLayout