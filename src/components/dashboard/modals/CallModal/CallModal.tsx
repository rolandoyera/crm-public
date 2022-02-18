import { FC, useState } from "react"
import toast from "react-hot-toast"
import { Box, Dialog, Divider, Grid, TextField } from "@mui/material"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import { CallModalAction, CallModalCancel } from "./CallModalAction"
import CallAction from "./CallAction"
import { useParams } from "react-router-dom"
import { fireDb, serverTimestamp } from "lib/firebase"
import { firebaseAuth } from "lib/firebase"
import SaveIcon from "icons/Save"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
import { formatPhoneNumber } from "../../customer/helpers"
import { Formik } from "formik"
import * as Yup from "yup"

interface CustomerCallProps {
    holderPhoneNumber: string
    holderAltPhoneNumber: string
    spousePhoneNumber: string
    holderFirstName: string
    holderLastName: string
}

interface CallModalProps {
    onClose?: () => void
    openCall?: boolean
    customer?: CustomerCallProps
}

const initialState = {
    pointAction: "Called Client",
    note: "",
    pointNumber: "",
}
const CallModal: FC<CallModalProps> = (props) => {
    const user = firebaseAuth.currentUser
    const { onClose, openCall, customer, ...other } = props
    const [touches, setTouches] = useState(initialState)
    const { id } = useParams()
    const { pointNumber, note } = touches
    const formattedPhone = formatPhoneNumber(customer.holderPhoneNumber)
    const formattedAltPhone = formatPhoneNumber(customer.holderAltPhoneNumber)
    const formattedSpousePhone = formatPhoneNumber(customer.spousePhoneNumber)

    const handleCancel = () => {
        setTouches({ pointAction: "Called Client", note: "", pointNumber: "" })
        onClose()
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={openCall}
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
                            await fireDb
                                .collection("customers")
                                .doc(id)
                                .update({
                                    lastContact: serverTimestamp(),
                                    merge: true,
                                })
                                .then(() => {
                                    setTouches({
                                        pointAction: "Called Client",
                                        note: "",
                                        pointNumber: "",
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
                        pointAction: "Called Client",
                        note: note || "",
                        submit: null,
                        pointNumber: formattedPhone || "",
                    }}
                    validationSchema={Yup.object().shape({
                        pointNumber: Yup.string(),
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
                                        <TextField
                                            error={Boolean(
                                                touched.pointNumber &&
                                                    errors.pointNumber
                                            )}
                                            helperText={
                                                touched.pointNumber &&
                                                errors.pointNumber
                                            }
                                            select
                                            SelectProps={{ native: true }}
                                            fullWidth
                                            label="Select a number"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="pointNumber"
                                            defaultValue={
                                                values.pointNumber
                                                    ? formattedPhone
                                                    : pointNumber
                                            }
                                        >
                                            <option value={`${formattedPhone}`}>
                                                {formattedPhone}
                                            </option>
                                            {customer.holderAltPhoneNumber ? (
                                                <option
                                                    value={`${formattedAltPhone}`}
                                                >
                                                    alt: {formattedAltPhone}
                                                </option>
                                            ) : null}
                                            {customer.spousePhoneNumber ? (
                                                <option
                                                    value={`${formattedSpousePhone}`}
                                                >
                                                    spouse:{" "}
                                                    {formattedSpousePhone}
                                                </option>
                                            ) : null}
                                        </TextField>
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
                                        <CallModalAction
                                            icon={<SaveIcon fontSize="small" />}
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Save Note
                                        </CallModalAction>

                                        <Divider sx={{ my: 3 }} />

                                        <CallAction
                                            icon={
                                                <LocalPhoneIcon fontSize="small" />
                                            }
                                            href={`tel: ${values.pointNumber}`}
                                        >
                                            Place Call
                                        </CallAction>
                                        <Box sx={{ mt: 2 }}>
                                            <CallModalCancel
                                                icon={
                                                    <DoDisturbIcon fontSize="small" />
                                                }
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </CallModalCancel>
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

CallModal.defaultProps = {
    openCall: false,
}

export default CallModal
