import TextField from "@mui/material/TextField"

const MolinaPlans = ({ handleChange, policy, ...props }) => {
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
            <option value={"Core Care Bronze 4"}>Core Care Bronze 4</option>
            <option value={"Core Care Bronze 5"}>Core Care Bronze 5</option>
            <option value={"Constant Care Silver 2 100"}>
                Constant Care Silver 2 100
            </option>
            <option value={"Constant Care Silver 5 100"}>
                Constant Care Silver 5 100
            </option>
            <option value={"Constant Care Silver 7 100"}>
                Constant Care Silver 7 100
            </option>
        </TextField>
    )
}

export default MolinaPlans
