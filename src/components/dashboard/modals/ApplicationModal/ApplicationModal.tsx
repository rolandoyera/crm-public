import { FC, useState } from "react"
import { Box, Dialog, Divider, Grid, Typography, Button } from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import ArrowLeftIcon from "icons/ArrowLeft"
import ApplicationModalAction from "./ApplicationModalAction"
import { ApplicationPreview, ApplicationPDF } from "../../application"
import { useGetCustomerById } from "lib/useFirestore"
import { useGetDependents } from "lib/useDependents"
import { useParams, useNavigate } from "react-router-dom"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import PrintIcon from "@mui/icons-material/Print"
import EditIcon from "@mui/icons-material/Edit"
import AddCircleIcon from "@mui/icons-material/AddCircle"

interface ApplicationModalProps {
    onClose?: () => void
    open: boolean
    policy?: string
    notes?: any
}

const ApplicationModal: FC<ApplicationModalProps> = ({
    onClose,
    open,
    policy,
    notes,
    ...other
}) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [viewPDF, setViewPDF] = useState<boolean>(false)
    const { dependents } = useGetDependents(id)
    const { customer } = useGetCustomerById(id)
    const hasHealthNote = notes?.filter((x) => {
        return x.noteFrom === "Health Policy Note"
    })

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="lg"
                onClose={onClose}
                open={open}
                {...other}
            >
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={5}>
                        <Grid item sm={9} xs={12}>
                            <Box sx={{ mt: 2 }}>
                                <ApplicationPreview
                                    customer={customer}
                                    dependents={dependents}
                                    policy={policy}
                                    hasHealthNote={hasHealthNote}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box sx={{ mt: 3 }}>
                                <Typography
                                    color="textPrimary"
                                    component="h4"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 2,
                                    }}
                                    variant="overline"
                                >
                                    Actions
                                </Typography>
                                <ApplicationModalAction
                                    icon={<PrintIcon fontSize="small" />}
                                    onClick={(): void => setViewPDF(true)}
                                >
                                    Print
                                </ApplicationModalAction>
                                <Box sx={{ mt: 2 }}>
                                    <PDFDownloadLink
                                        document={
                                            <ApplicationPDF
                                                customer={customer}
                                                dependents={dependents}
                                                policy={policy}
                                                hasHealthNote={hasHealthNote}
                                            />
                                        }
                                        fileName="policy"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <ApplicationModalAction
                                            icon={
                                                <DownloadIcon fontSize="small" />
                                            }
                                        >
                                            Download PDF
                                        </ApplicationModalAction>
                                    </PDFDownloadLink>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    color="textPrimary"
                                    component="h4"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 2,
                                    }}
                                    variant="overline"
                                >
                                    More Actions
                                </Typography>
                                <ApplicationModalAction
                                    icon={<EditIcon fontSize="small" />}
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/customers/edit-client-details/${id}`
                                        )
                                    }
                                >
                                    Edit Client
                                </ApplicationModalAction>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <ApplicationModalAction
                                    icon={<EditIcon fontSize="small" />}
                                    onClick={() =>
                                        navigate(
                                            //@ts-ignore
                                            `/dashboard/customers/${id}/health-policy-edit/${policy.policyId}`
                                        )
                                    }
                                >
                                    Edit Policy
                                </ApplicationModalAction>
                            </Box>
                            {dependents.map((d, i) => (
                                <Box key={i} sx={{ mt: 2 }}>
                                    <ApplicationModalAction
                                        icon={<EditIcon fontSize="small" />}
                                        onClick={() =>
                                            navigate(
                                                //@ts-ignore
                                                `/dashboard/customers/${id}/dependent/${d.dependentId}`
                                            )
                                        }
                                    >
                                        Edit dependent #{i + 1}
                                    </ApplicationModalAction>
                                </Box>
                            ))}
                            <Box sx={{ mt: 2 }}>
                                <ApplicationModalAction
                                    icon={<AddCircleIcon fontSize="small" />}
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/customers/add-dependent/${id}`
                                        )
                                    }
                                >
                                    Add Dependent
                                </ApplicationModalAction>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
            <Dialog fullScreen open={viewPDF}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "background.default",
                            p: 2,
                        }}
                    >
                        <Button
                            color="primary"
                            startIcon={<ArrowLeftIcon fontSize="small" />}
                            onClick={(): void => setViewPDF(false)}
                            variant="contained"
                        >
                            Back
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <PDFViewer
                            height="100%"
                            style={{ border: "none" }}
                            width="100%"
                        >
                            <ApplicationPDF
                                customer={customer}
                                dependents={dependents}
                                policy={policy}
                                hasHealthNote={hasHealthNote}
                            />
                        </PDFViewer>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

ApplicationModal.defaultProps = {
    open: false,
}

export default ApplicationModal
