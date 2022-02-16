import TextField from "@mui/material/TextField"

const OscarPlans = ({ handleChange, policy, ...props }) => {
    return (
        <TextField
            {...props}
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

            <option value={"Oscar Bronze Classic Next"}>
                Oscar Bronze Classic Next
            </option>
            <option value={"Oscar Bronze Classic Next 2"}>
                Oscar Bronze Classic Next 2
            </option>
            <option value={"Oscar Bronze Classic PCP"}>
                Oscar Bronze Classic PCP
            </option>
            <option value={"Oscar Silver Connect CSR 150"}>
                Oscar Silver Connect CSR 150
            </option>
            <option value={"Oscar Silver Classic"}>
                Oscar Silver Classic PCP Saver
            </option>
            <option value={"Oscar Silver Classic"}>
                Oscar Silver Classic PCP Saver
            </option>
            <option value={"Oscar Silver Elite"}>Oscar Silver Elite</option>
            <option value={"Oscar Silver Simple"}>Oscar Silver Simple</option>
            <option value={"Oscar Silver Simple PCP Saver"}>
                Oscar Silver Simple PCP Saver
            </option>
            <option value={"Oscar Silver Simple Specialist Saver"}>
                Oscar Silver Simple Specialist Saver
            </option>
        </TextField>
    )
}

export default OscarPlans
