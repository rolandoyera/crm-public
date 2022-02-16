import {
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material"
import { formatPhoneNumber, normalizeInput } from "../helpers"

const BeneficiaryForm = ({ handleChange, beneficiary }) => {
    const formattedBeneficiaryPhone = formatPhoneNumber(
        beneficiary.beneficiaryPhoneNumber
    )
    return (
        <>
            <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                Beneficiary Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="First name"
                        name="beneficiaryFirstName"
                        onChange={handleChange}
                        required
                        value={beneficiary.beneficiaryFirstName || ""}
                        variant="outlined"
                        autoComplete={"new-password"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Middle Name"
                        name="beneficiaryMiddleName"
                        onChange={handleChange}
                        value={beneficiary.beneficiaryMiddleName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="beneficiaryLastName"
                        onChange={handleChange}
                        required
                        value={beneficiary.beneficiaryLastName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="beneficiaryDOB"
                        onChange={handleChange}
                        value={beneficiary.beneficiaryDOB || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="SSN"
                        name="beneficiarySSN"
                        onChange={handleChange}
                        value={
                            beneficiary.beneficiarySSN
                                ? normalizeInput(beneficiary.beneficiarySSN)
                                : ""
                        }
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="beneficiaryRelation"
                        label="Relation"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={beneficiary.beneficiaryRelation || ""}
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
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="beneficiaryPhoneNumber"
                        onChange={handleChange}
                        value={
                            beneficiary.beneficiaryPhoneNumber
                                ? formattedBeneficiaryPhone
                                : ""
                        }
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="beneficiaryEmail"
                        type="email"
                        onChange={handleChange}
                        value={beneficiary.beneficiaryEmail || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="masked-field">
                            Percentage Amount
                        </InputLabel>
                        <OutlinedInput
                            id="masked-field"
                            type="number"
                            name="beneficiaryPercentage"
                            value={beneficiary.beneficiaryPercentage || ""}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                            label="Percentage Amount"
                            autoComplete="new-password"
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default BeneficiaryForm
