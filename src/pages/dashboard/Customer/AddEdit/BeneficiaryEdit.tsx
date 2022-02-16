import type { FC } from "react"
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Link,
    Typography,
} from "@mui/material"

import ChevronRightIcon from "icons/ChevronRight"
import { CRM } from "lib/constants"
import { useGetCustomerById } from "lib/useFirestore"
import EditBeneficiary from "components/dashboard/customer/AddEdit/edit-beneficiary"

const BeneficiaryEdit: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { customer } = useGetCustomerById(id) as any
    return (
        <>
            <Helmet>
                <title>Edit Beneficiary | {CRM.name}</title>
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
                                Edit Beneficiary
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
                                <Link
                                    sx={{ cursor: "pointer" }}
                                    color="textPrimary"
                                    onClick={() => navigate(-1)}
                                    variant="subtitle2"
                                >
                                    {customer.holderFirstName}{" "}
                                    {customer.holderLastName}
                                </Link>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Beneficiary
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <EditBeneficiary customer={customer} />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default BeneficiaryEdit
