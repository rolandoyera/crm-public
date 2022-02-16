import TextField from "@mui/material/TextField"

const AvMedPlans = ({ handleChange, policy, ...props }) => {
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

            <option value={"AvMed Entrust Silver 300"}>
                AvMed Entrust Silver 300
            </option>
            <option value={"AvMed Entrust Silver 350"}>
                AvMed Entrust Silver 350
            </option>
            <option value={"AvMed Entrust Silver 500"}>
                AvMed Entrust Silver 500
            </option>
        </TextField>
    )
}

export default AvMedPlans
