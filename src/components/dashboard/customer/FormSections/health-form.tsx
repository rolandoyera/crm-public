import { Grid, TextField, Typography } from "@mui/material"
import { carriers } from "../helpers"
import NumberFormat from "react-number-format"
import { forwardRef } from "react"
import { formatDate } from "lib/formatDate"
import {
    AetnaPlans,
    AvMedPlans,
    AmbetterPlans,
    BrightHealthPlans,
    CignaPlans,
    FridayPlans,
    FloridaBluePlans,
    MolinaPlans,
    OscarPlans,
    UnitedHealthPlans,
} from "../helpers/plans"
import InputAdornment from "@mui/material/InputAdornment"

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
                fixedDecimalScale={true}
                decimalScale={2}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    })
                }}
                isNumericString
                prefix="$"
            />
        )
    }
)

const HealthForm = ({ handleChange, policy }) => {
    const formattedEffectiveDate = formatDate(policy.policyEffectiveDate)
    const formattedApplicationDate = formatDate(policy.policyApplicationDate)
    const mp = policy.policyMonthlyPremium - policy.policySubsidyAmount

    return (
        <>
            <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                Health Policy Details
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
                        <option value={"Health"}>Health</option>
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
                        value={policy.policyCarrier}
                        variant="outlined"
                    >
                        {carriers.map((c) => (
                            <option key={c.name} value={c.value}>
                                {c.name}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item md={3} xs={12}>
                    {(() => {
                        switch (policy.policyCarrier) {
                            case "Aetna":
                                return (
                                    <AetnaPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "Ambetter":
                                return (
                                    <AmbetterPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "AvMed":
                                return (
                                    <AvMedPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "Bright Healthcare":
                                return (
                                    <BrightHealthPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "Cigna":
                                return (
                                    <CignaPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "Friday Health":
                                return (
                                    <FridayPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "Florida Blue":
                                return (
                                    <FloridaBluePlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "Molina Healthcare":
                                return (
                                    <MolinaPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "Oscar Health":
                                return (
                                    <OscarPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            case "United Healthcare":
                                return (
                                    <UnitedHealthPlans
                                        handleChange={handleChange}
                                        policy={policy}
                                    />
                                )
                            default:
                                return (
                                    <TextField
                                        disabled
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
                                        <option value={"Bronze"}>Bronze</option>
                                        <option value={"Silver"}>Silver</option>
                                        <option value={"Gold"}>Gold</option>
                                    </TextField>
                                )
                        }
                    })()}
                </Grid>

                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        name="policySubscribers"
                        label="Suscribers"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={policy.policySubscribers || ""}
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
                        label="Subscriber ID"
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
                        label="Member No."
                        name="policyNumber"
                        onChange={handleChange}
                        value={policy.policyNumber || ""}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        required
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
                        value={policy.policyMonthlyPremium}
                        onChange={handleChange}
                        fullWidth
                        name="policyMonthlyPremium"
                        InputProps={{
                            inputComponent: NumberFormatCustom as any,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        label="Subsidy"
                        value={policy.policySubsidyAmount}
                        onChange={handleChange}
                        fullWidth
                        name="policySubsidyAmount"
                        InputProps={{
                            inputComponent: NumberFormatCustom as any,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        label="Net Monthly Premium"
                        value={mp || ""}
                        onChange={handleChange}
                        fullWidth
                        name="policyTotalMonthlyPremium"
                        InputProps={{
                            inputComponent: NumberFormatCustom as any,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        className="hide-input-arrows"
                        type="number"
                        label="Deductible"
                        value={policy.policyDeductible || ""}
                        onChange={handleChange}
                        fullWidth
                        name="policyDeductible"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                </Grid>

                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        name="isVerified"
                        label="Verified"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={policy.isVerified || "false"}
                        variant="outlined"
                    >
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                    </TextField>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        name="rewards"
                        label="Rewards"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={policy.rewards || ""}
                        variant="outlined"
                    >
                        <option value={""}></option>
                        <option value={"N/A"}>N/A</option>
                        <option value={"Partial"}>Partial</option>
                        <option value={"Complete"}>Complete</option>
                    </TextField>
                </Grid>
            </Grid>
        </>
    )
}

export default HealthForm
