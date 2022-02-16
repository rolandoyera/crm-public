import TextField from "@mui/material/TextField"

const AmbetterPlans = ({ handleChange, policy, ...props }) => {
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

            <option value={"Ambetter Balanced Care 11"}>
                Ambetter Balanced Care 11
            </option>
            <option value={"Ambetter Balanced Care 12"}>
                Ambetter Balanced Care 12
            </option>
            <option value={"Ambetter Balanced Care 24"}>
                Ambetter Balanced Care 24
            </option>
            <option value={"Ambetter Balanced Care 32"}>
                Ambetter Balanced Care 32
            </option>
            <option value={"Ambetter Value Silver 11"}>
                Ambetter Value Silver 11
            </option>
            <option value={"Ambetter Value Silver 32"}>
                Ambetter Value Silver 32
            </option>
        </TextField>
    )
}

export default AmbetterPlans
