import {
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material"
import { formatDate } from "lib/formatDate"
import NumberFormat from "react-number-format"
import { forwardRef } from "react"

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}

const NumberFormatCustom = forwardRef<NumberFormat, CustomProps>(
    function NumberFormatCustom(props, ref) {
        const { onChange, ...other } = props

        return (
            <NumberFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    })
                }}
                thousandSeparator
                isNumericString
                prefix="$"
            />
        )
    }
)

const LifeForm = ({ handleChange, policy }) => {
    const formattedEffectiveDate = formatDate(policy.policyEffectiveDate)
    const formattedApplicationDate = formatDate(policy.policyApplicationDate)

    return (
        <>
            <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                Life Policy Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="policyType"
                        label="Policy Type"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={policy.policyType || ""}
                        variant="outlined"
                    >
                        <option value={"Life"}>Life</option>
                    </TextField>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        name="policyCarrier"
                        label="Carrier"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={policy.policyCarrier || ""}
                        variant="outlined"
                    >
                        <option value={""}></option>
                        <option value={"American"}>American</option>
                        <option value={"Gerber"}>Gerber</option>
                        <option value={"National"}>National</option>
                    </TextField>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        name="policyPlan"
                        label="Plan Type"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={policy.policyPlan || ""}
                        variant="outlined"
                    >
                        <option value={""}></option>
                        <option value={"Term"}>Term</option>
                        <option value={"Whole"}>Whole</option>
                        <option value={"Universal"}>Universal</option>
                        <option value={"Living Expenses"}>
                            Living Expenses
                        </option>
                        <option value={"Assure"}>Assure</option>
                        <option value={"Ret"}>Ret</option>
                    </TextField>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        autoComplete="new-password"
                        fullWidth
                        label="Member No."
                        name="policyNumber"
                        onChange={handleChange}
                        value={policy.policyNumber || ""}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        autoComplete="new-password"
                        fullWidth
                        label="Effective Date"
                        name="policyEffectiveDate"
                        onChange={handleChange}
                        value={
                            policy.policyEffectiveDate
                                ? formattedEffectiveDate
                                : ""
                        }
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        label="Monthly Premium"
                        value={policy.policyTotalMonthlyPremium}
                        onChange={handleChange}
                        fullWidth
                        name="policyTotalMonthlyPremium"
                        InputProps={{
                            inputComponent: NumberFormatCustom as any,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        name="policyBeneficiaries"
                        label="Beneficiaries"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={policy.policyBeneficiaries || ""}
                        variant="outlined"
                    >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </TextField>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        autoComplete="new-password"
                        fullWidth
                        label="Application No."
                        name="policyApplicationNumber"
                        onChange={handleChange}
                        value={policy.policyApplicationNumber || ""}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        autoComplete="new-password"
                        fullWidth
                        label="Application Date"
                        name="policyApplicationDate"
                        onChange={handleChange}
                        value={
                            policy.policyApplicationDate
                                ? formattedApplicationDate
                                : ""
                        }
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="monthly-premium">
                            Coverage Amount
                        </InputLabel>
                        <OutlinedInput
                            id="monthly-premium"
                            type="number"
                            name="policyCoverageAmount"
                            value={policy.policyCoverageAmount || ""}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            label="Coverage Amount"
                            autoComplete="new-password"
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default LifeForm
