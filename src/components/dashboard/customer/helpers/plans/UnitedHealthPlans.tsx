import TextField from "@mui/material/TextField"

const UnitedHealthPlans = ({ handleChange, policy, ...props }) => {
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

            <option value={"UHC Silver-C Advantage+ Extra"}>
                UHC Silver-C Advantage+ Extra
            </option>
            <option value={"UHC Silver-D Advantage+ Saver"}>
                UHC Silver-D Advantage+ Saver
            </option>
            <option value={"UHC Silver-C Virtual First"}>
                UHC Silver-C Virtual First
            </option>
            <option value={"UHC Silver-C Virtual First Saver"}>
                UHC Silver-C Virtual First Saver
            </option>
        </TextField>
    )
}

export default UnitedHealthPlans
