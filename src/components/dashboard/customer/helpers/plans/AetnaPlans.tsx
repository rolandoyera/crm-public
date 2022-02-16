import TextField from "@mui/material/TextField"

const AetnaPlans = ({ handleChange, policy, ...props }) => {
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

            <option value={"Aetna CVS Silver 2"}>Aetna CVS Silver 2</option>
        </TextField>
    )
}

export default AetnaPlans
