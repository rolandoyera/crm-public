import { Grid, TextField, Typography } from "@mui/material"
import { normalizeInput } from "../helpers"

const DependentForm = ({ handleChange, dependent }) => {
    return (
        <>
            <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                Dependent Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="First name"
                        name="dependentFirstName"
                        onChange={handleChange}
                        required
                        value={dependent.dependentFirstName || ""}
                        variant="outlined"
                        autoComplete={"new-password"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Middle Name"
                        name="dependentMiddleName"
                        onChange={handleChange}
                        value={dependent.dependentMiddleName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="dependentLastName"
                        onChange={handleChange}
                        required
                        value={dependent.dependentLastName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dependentDOB"
                        onChange={handleChange}
                        value={dependent.dependentDOB || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="SSN"
                        name="dependentSSN"
                        onChange={handleChange}
                        value={
                            dependent.dependentSSN
                                ? normalizeInput(dependent.dependentSSN)
                                : ""
                        }
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Citizenship"
                        name="dependentCitizenship"
                        onChange={handleChange}
                        value={dependent.dependentCitizenship || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="dependentRelation"
                        label="Relation"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={dependent.dependentRelation || ""}
                        variant="outlined"
                    >
                        <option value=""></option>
                        <option value={"Child"}>Child</option>
                        <option value={"Sibling"}>Sibling</option>
                        <option value={"Parent"}>Parent</option>
                        <option value={"Grandparent"}>Grandparent</option>
                        <option value={"Relative"}>Relative</option>
                        <option value={"Inlaw"}>Inlaw</option>
                        <option value={"Other"}>Other</option>
                    </TextField>
                </Grid>
            </Grid>
        </>
    )
}

export default DependentForm
