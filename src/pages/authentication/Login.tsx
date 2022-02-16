import type { FC } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Link,
    Typography,
} from "@mui/material"
import { CRM } from "lib/constants"
import { LoginFirebase } from "../../components/authentication/login"
import Logo from "../../components/Logo"

const platformIcons = {
    Firebase: "/static/icons/firebase.svg",
}

const Login: FC = () => {
    return (
        <>
            <Helmet>
                <title>Login | {CRM.name}</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Container maxWidth="sm" sx={{ py: "80px" }}>
                    <Box
                        sx={{
                            alignItems: "center",
                            backgroundColor: "background.paper",
                            borderColor: "divider",
                            borderRadius: 1,
                            borderStyle: "solid",
                            borderWidth: 1,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            mb: 4,
                            p: 2,
                            "& > img": {
                                height: 32,
                                width: "auto",
                                flexGrow: 0,
                                flexShrink: 0,
                            },
                        }}
                    >
                        <Typography color="textSecondary" variant="caption">
                            The app authenticates via Firebase
                        </Typography>
                        <img alt="Auth platform" src={platformIcons.Firebase} />
                    </Box>
                    <Card elevation={16} sx={{ p: 4 }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    mb: 3,
                                }}
                            >
                                <RouterLink to="/">
                                    <Logo
                                        sx={{
                                            height: 40,
                                            width: 40,
                                        }}
                                    />
                                </RouterLink>

                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h4"
                                >
                                    Log in
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    mt: 3,
                                }}
                            >
                                <LoginFirebase />
                            </Box>
                            <Divider sx={{ my: 3 }} />

                            <Link
                                sx={{ mt: 1 }}
                                underline={"none"}
                                color="textSecondary"
                                variant="body2"
                            >
                                Forgot password
                            </Link>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

export default Login
