import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "icons/Save";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const HealthNoteModal = (props) => {
    const { open, onClose, handleChange, handleSubmit, customerNotes } = props;

    return (
        <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
            <Box sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                        <Grid item sm={8} xs={12}>
                            <Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    required
                                    autoFocus
                                    placeholder="Leave a note"
                                    label="Note"
                                    rows={6}
                                    variant="outlined"
                                    onChange={handleChange}
                                    name="note"
                                    value={customerNotes.note || ""}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                sx={{
                                    justifyContent: "flex-start",
                                    "& + &": {
                                        mt: 2,
                                    },
                                }}
                                color="primary"
                                fullWidth
                                startIcon={<SaveIcon fontSize="small" />}
                                type="submit"
                                variant="outlined"
                            >
                                Save Note
                            </Button>
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    sx={{
                                        justifyContent: "flex-start",
                                        "& + &": {
                                            mt: 2,
                                        },
                                    }}
                                    color="primary"
                                    fullWidth
                                    variant="outlined"
                                    startIcon={
                                        <DoDisturbIcon fontSize="small" />
                                    }
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Dialog>
    );
};

export default HealthNoteModal;
