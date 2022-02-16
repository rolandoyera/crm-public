import {
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Switch,
    TextField,
    Typography,
} from "@mui/material"
import { useState } from "react"
import { formatPhoneNumber, normalizeInput } from "../helpers"
import { formatDate } from "lib/formatDate"

const SpouseForm = ({ handleChange, customer }) => {
    const [checked, setChecked] = useState(false)
    const formattedSpouseSSN = normalizeInput(customer.spouseSSN)
    const formattedSpouseDOB = formatDate(customer.spouseDOB)
    const formattedSpousePhone = formatPhoneNumber(customer.spousePhoneNumber)
    const formattedSpouseAltPhone = formatPhoneNumber(
        customer.spouseAltPhoneNumber
    )
    return (
        <>
            <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                Spouse Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="First name"
                        name="spouseFirstName"
                        onChange={handleChange}
                        required
                        value={customer.spouseFirstName || ""}
                        variant="outlined"
                        autoComplete={"new-password"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Middle Name"
                        name="spouseMiddleName"
                        onChange={handleChange}
                        value={customer.spouseMiddleName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="spouseLastName"
                        onChange={handleChange}
                        required
                        value={customer.spouseLastName || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={checked}
                                    color="primary"
                                    onChange={() => setChecked(!checked)}
                                />
                            }
                            label="Different Address"
                            labelPlacement="end"
                        />
                    </FormGroup>
                </Grid>
                <Grid
                    item
                    sx={{ display: { xs: "none", sm: "block" } }}
                    md={9}
                ></Grid>
                {checked ? (
                    <>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="spouseAddress"
                                onChange={handleChange}
                                required={checked}
                                value={
                                    checked
                                        ? customer.spouseAddress
                                        : customer.holderAddress
                                }
                                variant="outlined"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="City"
                                name="spouseCity"
                                onChange={handleChange}
                                required={checked}
                                value={customer.spouseCity || ""}
                                variant="outlined"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                fullWidth
                                label="State"
                                name="spouseState"
                                onChange={handleChange}
                                required={checked}
                                value={customer.spouseState || ""}
                                variant="outlined"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                fullWidth
                                label="Zip"
                                name="spouseZip"
                                onChange={handleChange}
                                required={checked}
                                value={customer.spouseZip || ""}
                                variant="outlined"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </>
                ) : null}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Email address"
                        name="spouseEmail"
                        onChange={handleChange}
                        type="email"
                        value={customer.spouseEmail || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="spousePhoneNumber"
                        onChange={handleChange}
                        value={
                            customer.spousePhoneNumber
                                ? formattedSpousePhone
                                : ""
                        }
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Alt Phone Number"
                        name="spouseAltPhoneNumber"
                        onChange={handleChange}
                        value={
                            customer.spouseAltPhoneNumber
                                ? formattedSpouseAltPhone
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
                        name="spouseDOB"
                        onChange={handleChange}
                        value={customer.spouseDOB ? formattedSpouseDOB : ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="spouseTobacco"
                        label="Tobacco User"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={customer.spouseTobacco || ""}
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
                        name="spouseEmployer"
                        onChange={handleChange}
                        value={customer.spouseEmployer || ""}
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
                            id="masked-field"
                            type="number"
                            name="spouseIncome"
                            value={customer.spouseIncome || 0}
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
                        name="spouseSSN"
                        onChange={handleChange}
                        value={customer.spouseSSN ? formattedSpouseSSN : ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        name="spouseCitizenship"
                        label="Citizenship"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={customer.spouseCitizenship || ""}
                        variant="outlined"
                    >
                        <option value=""></option>
                        <option value={"US Citizen"}>US Citizen</option>
                        <option value={"Resident"}>Resident</option>
                        <option value={"Work Visa"}>Work Visa</option>
                    </TextField>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Citizenship"
                        name="spouseCitizenship"
                        onChange={handleChange}
                        value={customer.spouseCitizenship || ""}
                        variant="outlined"
                        autoComplete="new-password"
                    />
                </Grid> */}
            </Grid>
        </>
    )
}

export default SpouseForm
