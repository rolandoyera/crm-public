import "react-perfect-scrollbar/dist/css/styles.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-quill/dist/quill.snow.css"
import "nprogress/nprogress.css"
import "styles/styles.css"
import "styles/search.css"
import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import App from "./App"
import { AuthProvider } from "./contexts/FirebaseAuthContext"
import { SettingsProvider } from "./contexts/SettingsContext"
import store from "./store"

ReactDOM.render(
    <StrictMode>
        <HelmetProvider>
            <ReduxProvider store={store}>
                <StyledEngineProvider injectFirst>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <SettingsProvider>
                            <BrowserRouter>
                                <AuthProvider>
                                    <App />
                                </AuthProvider>
                            </BrowserRouter>
                        </SettingsProvider>
                    </LocalizationProvider>
                </StyledEngineProvider>
            </ReduxProvider>
        </HelmetProvider>
    </StrictMode>,
    document.getElementById("root")
)
