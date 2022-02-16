import type { FC } from "react"
import { Link as RouterLink } from "react-router-dom"

import { Helmet } from "react-helmet-async"
import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Link,
    Typography,
} from "@mui/material"
import { Add } from "components/dashboard/customer/AddEdit"
import ChevronRightIcon from "icons/ChevronRight"
import { CRM } from "lib/constants"

const CustomerAdd: FC = () => {
    return (
        <>
            <Helmet>
                <title>Add New Client | {CRM.name}</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: {
                        xs: 2,
                        lg: 4,
                    },
                }}
            >
                <Container maxWidth={false}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item>
                            <Typography color="textPrimary" variant="h5">
                                Add A Prospect
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
                    </Grid>
                    <Box mt={3}>
                        <Add />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default CustomerAdd
