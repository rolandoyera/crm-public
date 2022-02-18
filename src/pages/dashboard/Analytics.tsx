import type { FC } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Link,
    Typography,
} from "@mui/material"
import {
    AnalyticsGeneralOverview,
    AnalyticsProspectSources,
    AnalyticsClients,
} from "../../components/dashboard/analytics"
import ChevronDownIcon from "../../icons/ChevronDown"
import ChevronRightIcon from "../../icons/ChevronRight"
import DownloadIcon from "../../icons/Download"
import { CRM } from "lib/constants"

const Analytics: FC = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard: Analytics | {CRM.name}</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item>
                            <Typography color="textPrimary" variant="h5">
                                Analytics
                            </Typography>
                            <Breadcrumbs
                                aria-label="breadcrumb"
                                separator={
                                    <ChevronRightIcon fontSize="small" />
                                }
                                sx={{ mt: 1 }}
                            >
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="/dashboard"
                                    variant="subtitle2"
                                >
                                    Dashboard
                                </Link>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Analytics
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item>
                            <Button
                                endIcon={<DownloadIcon fontSize="small" />}
                                variant="outlined"
                            >
                                Export
                            </Button>
                            <Button
                                color="primary"
                                endIcon={<ChevronDownIcon fontSize="small" />}
                                sx={{ ml: 2 }}
                                variant="contained"
                            >
                                Last month
                            </Button>
                        </Grid>
                    </Grid>
                    <Box sx={{ py: 3 }}>
                        <AnalyticsGeneralOverview />
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AnalyticsClients sx={{ height: "100%" }} />
                        </Grid>
                        <Grid item xl={3} md={4} xs={12}>
                            <AnalyticsProspectSources />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Analytics
