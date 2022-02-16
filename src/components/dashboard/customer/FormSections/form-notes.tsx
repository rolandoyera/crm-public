import { Grid, TextField, Typography } from "@mui/material"

const HealthFormNote = ({ handleChange, policy }) => {
    return (
        <>
            <Typography sx={{ mb: 3 }} color="textPrimary" variant="h5">
                {policy.policyType} Policy Notes
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="new-password"
                        autoFocus
                        multiline
                        placeholder="Add a note.."
                        label="Policy Notes"
                        minRows={5}
                        style={{ width: "100%" }}
                        name="policyNote"
                        onChange={handleChange}
                        value={policy.policyNote || ""}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default HealthFormNote
