import toast from "react-hot-toast"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Formik } from "formik"
import * as Yup from "yup"
import { firebaseAuth } from "lib/firebase"

export default function DisplayNameModal(props) {
    const { open, onClose } = props
    const user = firebaseAuth.currentUser
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
            <Formik
                initialValues={{
                    first: "",
                    last: "",
                    submit: null,
                }}
                onSubmit={async (
                    values,
                    { resetForm, setErrors, setStatus, setSubmitting }
                ): Promise<void> => {
                    try {
                        user.updateProfile({
                            displayName: values.first + " " + values.last,
                        })
                            .then(() => {
                                console.log("Successful")
                            })
                            .catch((error) => {
                                console.log("Nope", error)
                            })

                        onClose()
                        resetForm()
                        setStatus({ success: true })
                        setSubmitting(false)
                        toast.success("Name Updated")
                        window.location.reload()
                    } catch (err) {
                        console.error(err)
                        toast.error("Something went wrong!")
                        setStatus({ success: false })
                        setErrors({ submit: err.message })
                        setSubmitting(false)
                    }
                }}
                validationSchema={Yup.object().shape({
                    first: Yup.string()
                        .matches(
                            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                            "Please check your spelling"
                        )
                        .required("First name required"),
                    last: Yup.string()
                        .matches(
                            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                            "Please check your spelling"
                        )
                        .required("Last name required"),
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
                            <DialogTitle>Before we get started..</DialogTitle>
                            <DialogContent sx={{ width: "500px" }}>
                                <DialogContentText>
                                    Please enter your first and last name.
                                </DialogContentText>
                                <TextField
                                    required
                                    autoFocus
                                    error={Boolean(
                                        touched.first && errors.first
                                    )}
                                    helperText={touched.first && errors.first}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.first}
                                    name="first"
                                    margin="dense"
                                    label="First"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    required
                                    error={Boolean(touched.last && errors.last)}
                                    helperText={touched.last && errors.last}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.last}
                                    name="last"
                                    margin="dense"
                                    label="Last"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button type="submit">Save</Button>
                            </DialogActions>
                        </form>
                    </>
                )}
            </Formik>
        </Dialog>
    )
}
