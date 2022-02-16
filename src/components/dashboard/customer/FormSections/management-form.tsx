import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material"
import { sources } from "../helpers"
import { useNavigate } from "react-router-dom"
import SaveIcon from "icons/Save"

const ManagementForm = ({ handleChange, id, isSubmitting, customer }) => {
    const navigate = useNavigate()

    return (
        <Card sx={{ mt: 3 }}>
            <Box sx={{ p: 3 }}>
                <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                    {customer.isProspect === true ? "Prospect" : "Client"}{" "}
                    Management
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            autoComplete="new-password"
                            fullWidth
                            label="HCG User Name"
                            name="hcgUser"
                            onChange={handleChange}
                            value={customer.hcgUser || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            autoComplete="new-password"
                            fullWidth
                            label="HCG Password"
                            name="hcgPassword"
                            onChange={handleChange}
                            value={customer.hcgPassword || ""}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            required
                            name="policyInterest"
                            label="Policy Interest"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={customer.policyInterest || ""}
                            variant="outlined"
                        >
                            <option value=""></option>
                            <option value={"Health"}>Health</option>
                            <option value={"Life"}>Life</option>
                            <option value={"Home"}>Home</option>
                            <option value={"Auto"}>Auto</option>
                            <option value={"Dental"}>Dental</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            required
                            name="source"
                            label="Source"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={customer.source || ""}
                            variant="outlined"
                        >
                            {sources.map((s) => (
                                <option key={s.name} value={s.value}>
                                    {s.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <Button
                        sx={{ px: 3, py: 1, mr: 2 }}
                        color="primary"
                        onClick={() => navigate(-1)}
                        variant="text"
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ py: 1 }}
                        color="primary"
                        disabled={isSubmitting}
                        startIcon={<SaveIcon fontSize="small" />}
                        type="submit"
                        variant="contained"
                    >
                        {id ? "Save" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}

export default ManagementForm
