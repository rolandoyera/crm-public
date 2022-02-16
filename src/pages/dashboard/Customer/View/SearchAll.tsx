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
import { Search } from "components/dashboard/customer"
import ChevronRightIcon from "icons/ChevronRight"
import { CRM } from "lib/constants"

const SearchAll: FC = () => {
    return (
        <>
            <Helmet>
                <title>Search | {CRM.name}</title>
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
                                Search
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
                                    Search
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <Search />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default SearchAll
