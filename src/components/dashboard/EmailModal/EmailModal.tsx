import { FC, useState } from "react"
import toast from "react-hot-toast"
import { Box, Dialog, Divider, Grid, TextField } from "@mui/material"

import { EmailSave, EmailCancel } from "./EmailModalActions"
import { useParams } from "react-router-dom"
import { fireDb, serverTimestamp } from "lib/firebase"
import { firebaseAuth } from "lib/firebase"
import SaveIcon from "icons/Save"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
import { Formik } from "formik"
import * as Yup from "yup"

interface EmailProps {
    holderEmail: string
    holderAltPhoneNumber: string
    spousePhoneNumber: string
    holderFirstName: string
    holderLastName: string
}

interface EmailModalProps {
    onClose?: () => void
    openEmail?: boolean
    customer?: EmailProps
}

const initialState = {
    pointAction: "Emailed Client",
    note: "",
    pointEmail: "",
}
const EmailModal: FC<EmailModalProps> = (props) => {
    const user = firebaseAuth.currentUser
    const { onClose, openEmail, customer, ...other } = props
    const [touches, setTouches] = useState(initialState)
    const { id } = useParams()
    const { note } = touches

    const handleCancel = () => {
        setTouches({ pointAction: "Emailed Client", note: "", pointEmail: "" })
        onClose()
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={openEmail}
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
                                        pointAction: "Emailed Client",
                                        note: "",
                                        pointEmail: "",
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
                        pointAction: "Emailed Client",
                        note: note || "",
                        submit: null,
                        pointEmail: customer.holderEmail || "",
                    }}
                    validationSchema={Yup.object().shape({
                        pointEmail: Yup.string(),
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
                                                touched.pointEmail &&
                                                    errors.pointEmail
                                            )}
                                            helperText={
                                                touched.pointEmail &&
                                                errors.pointEmail
                                            }
                                            select
                                            SelectProps={{ native: true }}
                                            fullWidth
                                            label="Select an Email"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="pointEmail"
                                            defaultValue={
                                                values.pointEmail
                                                    ? customer.holderEmail
                                                    : ""
                                            }
                                        >
                                            <option
                                                value={`${customer.holderEmail}`}
                                            >
                                                {customer.holderEmail}
                                            </option>
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
                                        <EmailSave
                                            icon={<SaveIcon fontSize="small" />}
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Save Note
                                        </EmailSave>

                                        <Divider sx={{ my: 3 }} />

                                        <Box sx={{ mt: 2 }}>
                                            <EmailCancel
                                                icon={
                                                    <DoDisturbIcon fontSize="small" />
                                                }
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </EmailCancel>
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

EmailModal.defaultProps = {
    openEmail: false,
}

export default EmailModal
