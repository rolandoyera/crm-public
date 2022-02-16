import TextField from "@mui/material/TextField"

const BrightHealthPlans = ({ handleChange, policy, ...props }) => {
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

            <option value={"Super Bronze"}>Super Bronze</option>
            <option value={"Super Silver"}>Super Silver</option>
            <option value={"Super Gold"}>Super Gold</option>
        </TextField>
    )
}

export default BrightHealthPlans
