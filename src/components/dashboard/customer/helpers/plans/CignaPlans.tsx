import TextField from "@mui/material/TextField"

const CignaPlans = ({ handleChange, policy, ...props }) => {
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
            <option value={"Cigna Connect 0-4A"}>Cigna Connect 0-4A</option>
            <option value={"Cigna Connect 0-4B"}>Cigna Connect 0-4B</option>
            <option value={"Cigna Connect 4500"}>Cigna Connect 4500</option>\
        </TextField>
    )
}

export default CignaPlans
