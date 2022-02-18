import { FC, useState } from "react"
import toast from "react-hot-toast"
import { Box, Dialog, Grid, TextField } from "@mui/material"
import TouchModalAction from "./TouchModalAction"
import { useParams } from "react-router-dom"
import { fireDb, serverTimestamp } from "lib/firebase"
import { firebaseAuth } from "lib/firebase"
import SaveIcon from "icons/Save"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
import { Formik } from "formik"
import * as Yup from "yup"
import Select from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"

interface CustomerCallProps {
    holderFirstName: string
    holderLastName: string
}

interface TouchModalProps {
    onClose?: () => void
    open?: boolean
    customer?: CustomerCallProps
}

const initialState = {
    pointAction: "",
    note: "",
}

const TouchModal: FC<TouchModalProps> = (props) => {
    const user = firebaseAuth.currentUser
    const { onClose, open, customer, ...other } = props
    const [touches, setTouches] = useState(initialState)
    const { id } = useParams()
    const { pointAction, note } = touches

    const handleCancel = () => {
        setTouches({ pointAction: "", note: "" })
        onClose()
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
            {...other}
        >
            <Box sx={{ p: 3 }}>
                <Formik
                    onSubmit={async (
                        values,
                        { resetForm, setErrors, setStatus, setSubmitting }
                    ): Promise<void> => {
                        try {
                            await fireDb
                                .collection("customers")
                                .doc(id)
                                .collection("touches")
                                .add({
                                    ...values,
                                    createdAt: serverTimestamp(),
                                    user: user.displayName,
                                    customerName:
                                        customer.holderFirstName +
                                        " " +
                                        customer.holderLastName,
                                    customerId: id,
                                })
                                .then(() => {
                                    setTouches({
                                        pointAction: "",
                                        note: "",
                                    })
                                })
                            onClose()
                            resetForm()
                            setStatus({ success: true })
                            setSubmitting(false)
                            toast.success("Touch Point Added")
                        } catch (err) {
                            console.error(err)
                            toast.error("Something went wrong!")
                            setStatus({ success: false })
                            setErrors({ submit: err.message })
                            setSubmitting(false)
                        }
                    }}
                    initialValues={{
                        pointAction: pointAction || "",
                        note: note || "",
                        submit: null,
                    }}
                    validationSchema={Yup.object().shape({
                        pointAction:
                            Yup.string().required("A type is required"),
                        note: Yup.string().required("A note is required"),
                    })}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values,
                    }): JSX.Element => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={5}>
                                    <Grid item sm={8} xs={12}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(
                                                touched.pointAction &&
                                                    errors.pointAction
                                            )}
                                        >
                                            <InputLabel id="Type">
                                                Type
                                            </InputLabel>
                                            <Select
                                                error={Boolean(
                                                    touched.pointAction &&
                                                        errors.pointAction
                                                )}
                                                labelId="Type"
                                                label="Type"
                                                name="pointAction"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.pointAction || ""}
                                                renderValue={(value) => value}
                                            >
                                                <MenuItem value="">
                                                    <em>Select an option</em>
                                                </MenuItem>
                                                <MenuItem
                                                    value={
                                                        "Received Client Call"
                                                    }
                                                >
                                                    Received Client Call
                                                </MenuItem>
                                                <MenuItem
                                                    value={
                                                        "Received Client Email"
                                                    }
                                                >
                                                    Received Client Email
                                                </MenuItem>
                                            </Select>
                                            <FormHelperText
                                                error={Boolean(
                                                    touched.pointAction &&
                                                        errors.pointAction
                                                )}
                                            >
                                                {touched.pointAction &&
                                                    errors.pointAction}
                                            </FormHelperText>
                                        </FormControl>
                                        {/* <TextField
                                            error={Boolean(
                                                touched.pointAction &&
                                                    errors.pointAction
                                            )}
                                            helperText={
                                                touched.pointAction &&
                                                errors.pointAction
                                            }
                                            select
                                            SelectProps={{ native: true }}
                                            fullWidth
                                            label="Type"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="pointAction"
                                        >
                                            <option value=""></option>
                                            <option value="Received Client Call">
                                                Received Client Call
                                            </option>
                                            <option value="Received Client Email">
                                                Received Client Email
                                            </option>
                                        </TextField> */}
                                        <Box sx={{ mt: 3 }}>
                                            <TextField
                                                error={Boolean(
                                                    touched.note && errors.note
                                                )}
                                                helperText={
                                                    touched.note && errors.note
                                                }
                                                fullWidth
                                                multiline
                                                placeholder="Leave a note"
                                                label="Note"
                                                rows={6}
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="note"
                                                value={values.note || ""}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TouchModalAction
                                            icon={<SaveIcon fontSize="small" />}
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Save Note
                                        </TouchModalAction>
                                        <Box sx={{ mt: 2 }}>
                                            <TouchModalAction
                                                icon={
                                                    <DoDisturbIcon fontSize="small" />
                                                }
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </TouchModalAction>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    )}
                </Formik>
            </Box>
        </Dialog>
    )
}

TouchModal.defaultProps = {
    open: false,
}

export default TouchModal
