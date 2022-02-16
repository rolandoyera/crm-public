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
import { formatDate } from "lib/formatDate"

const ClientForm = ({ handleChange, customer }) => {
    const formattedPhone = formatPhoneNumber(customer.holderPhoneNumber)
    const formattedAltPhone = formatPhoneNumber(customer.holderAltPhoneNumber)
    const formattedDOB = formatDate(customer.holderDOB)
    const formattedSSN = normalizeInput(customer.holderSSN)
    return (
        <>
            <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                {customer.isProspect === true ? "Prospect" : "Client"} Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="holderFirstName"
                        onChange={handleChange}
                        required
                        value={customer.holderFirstName || ""}
                        variant="outlined"
                        autoComplete={"new-password"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Middle Name"
                        name="holderMiddleName"
                        onChange={handleChange}
                        value={customer.holderMiddleName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="holderLastName"
                        onChange={handleChange}
                        required
                        value={customer.holderLastName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="holderAddress"
                        onChange={handleChange}
                        value={customer.holderAddress || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="City"
                        name="holderCity"
                        onChange={handleChange}
                        value={customer.holderCity || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="State"
                        name="holderState"
                        onChange={handleChange}
                        value={customer.holderState || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="Zip"
                        name="holderZip"
                        onChange={handleChange}
                        value={customer.holderZip || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="holderEmail"
                        onChange={handleChange}
                        type="email"
                        value={customer.holderEmail || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="holderPhoneNumber"
                        onChange={handleChange}
                        value={
                            customer.holderPhoneNumber ? formattedPhone : " "
                        }
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Alternate Phone Number"
                        name="holderAltPhoneNumber"
                        onChange={handleChange}
                        value={
                            customer.holderAltPhoneNumber
                                ? formattedAltPhone
                                : ""
                        }
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="holderDOB"
                        onChange={handleChange}
                        value={customer.holderDOB ? formattedDOB : ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="holderTobacco"
                        label="Tobacco User"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={customer.holderTobacco || ""}
                        variant="outlined"
                    >
                        <option value=""></option>
                        <option value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Employer"
                        name="holderEmployer"
                        onChange={handleChange}
                        value={customer.holderEmployer || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="masked-field">
                            Annual Income
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            id="masked-field"
                            name="holderIncome"
                            value={customer.holderIncome || ""}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            label="Annual Income"
                            autoComplete="new-password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="SSN"
                        name="holderSSN"
                        onChange={handleChange}
                        value={customer.holderSSN ? formattedSSN : ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="holderCitizenship"
                        label="Citizenship"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={customer.holderCitizenship || ""}
                        variant="outlined"
                    >
                        <option value=""></option>
                        <option value={"US Citizen"}>US Citizen</option>
                        <option value={"Resident"}>Resident</option>
                        <option value={"Work Visa"}>Work Visa</option>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="holderTaxStatus"
                        label="Tax Filing Status"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={customer.holderTaxStatus || ""}
                        variant="outlined"
                    >
                        <option value=""></option>
                        <option value={"Single"}>Single</option>
                        <option value={"Head of Household"}>
                            Head of Household
                        </option>
                        <option value={"Married"}>Married</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="holderDependents"
                        label="Dependents"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={customer.holderDependents || ""}
                        variant="outlined"
                    >
                        <option value=""></option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Spouse"
                        name="spouse"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={customer.spouse || ""}
                        variant="outlined"
                    >
                        <option value=""></option>
                        <option value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option>
                    </TextField>
                </Grid>
            </Grid>
        </>
    )
}

export default ClientForm
