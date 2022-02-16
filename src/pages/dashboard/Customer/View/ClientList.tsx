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
import { ClientTable } from "components/dashboard/customer"
import ChevronRightIcon from "icons/ChevronRight"
import PlusIcon from "icons/Plus"
import { CRM } from "lib/constants"

const ClientList: FC = () => {
    return (
        <>
            <Helmet>
                <title>Recent Clients | {CRM.name}</title>
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
                                Recent Clients
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
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="/dashboard"
                                    variant="subtitle2"
                                >
                                    Management
                                </Link>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Clients
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item>
                            <Box sx={{ m: -1 }}>
                                <Button
                                    color="primary"
                                    component={RouterLink}
                                    to="/dashboard/customers/add"
                                    startIcon={<PlusIcon fontSize="small" />}
                                    sx={{ m: 1 }}
                                    variant="contained"
                                >
                                    Add A Prospect
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <ClientTable />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ClientList
