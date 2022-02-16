import TextField from "@mui/material/TextField"

const FloridaBluePlans = ({ handleChange, policy, ...props }) => {
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
        </TextField>
    )
}

export default FloridaBluePlans
