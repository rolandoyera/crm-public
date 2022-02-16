import { FC, useState } from "react"
import { useRoutes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { CssBaseline, ThemeProvider } from "@mui/material"
import "./i18n"
import SettingsDrawer from "./components/SettingsDrawer"
import SplashScreen from "./components/SplashScreen"
import useAuth from "./hooks/useAuth"
import useScrollReset from "./hooks/useScrollReset"
import useSettings from "./hooks/useSettings"
import routes from "./routes"
import { createCustomTheme } from "./theme"
import { ConfirmationServiceProvider } from "contexts/ConfirmContext/ConfirmationServiceContext"
import { TabsContext } from "contexts/TabsContext"

const App: FC = () => {
    const content = useRoutes(routes)
    const { settings } = useSettings()
    const auth = useAuth()
    const [currentTab, setCurrentTab] = useState("overview")
    useScrollReset()

    const theme = createCustomTheme({
        responsiveFontSizes: settings.responsiveFontSizes,
        roundedCorners: settings.roundedCorners,
        theme: settings.theme,
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        borderRadius: "4px",
                        padding: "12px 16px",
                        color: "white",
                    },
                    success: {
                        style: {
                            background: "#4caf50",
                        },
                        duration: 3000,
                        iconTheme: {
                            primary: "white",
                            secondary: "#4caf50",
                        },
                    },
                    error: {
                        style: {
                            background: "#f44336",
                        },
                        duration: 4000,
                        iconTheme: {
                            primary: "white",
                            secondary: "#f44336",
                        },
                    },
                }}
            />
            <SettingsDrawer />
            <ConfirmationServiceProvider>
                <TabsContext.Provider value={{ currentTab, setCurrentTab }}>
                    {auth.isInitialized ? content : <SplashScreen />}
                </TabsContext.Provider>
            </ConfirmationServiceProvider>
        </ThemeProvider>
    )
}

export default App
