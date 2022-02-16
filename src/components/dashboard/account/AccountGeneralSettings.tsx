import { FC, useState } from "react"
import toast from "react-hot-toast"
import * as Yup from "yup"
import { Formik } from "formik"
import { Avatar, Box, Button, Card, Grid } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Divider from "@mui/material/Divider"
import FormHelperText from "@mui/material/FormHelperText"
import { firebaseAuth } from "lib/firebase"
import { ProfileImageModal } from "../modals"
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate"

const AccountGeneralSettings: FC = (props) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const user = firebaseAuth.currentUser

    return (
        <Grid container {...props} maxWidth={1200} mx={"auto"}>
            <Grid item xs={12} mb={3}>
                <Card>
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    p: 1,
                                    border: (theme) =>
                                        `1px dashed ${theme.palette.divider}`,
                                    borderRadius: "50%",
                                }}
                            >
                                <Avatar
                                    src={user.photoURL}
                                    sx={{
                                        height: 140,
                                        width: 140,
                                    }}
                                />
                            </Box>
                            <Typography
                                color="textPrimary"
                                sx={{ mt: 1 }}
                                variant="h4"
                            >
                                {user.displayName}
                            </Typography>

                            <Button
                                startIcon={<AddPhotoIcon fontSize="small" />}
                                onClick={() => setOpen(true)}
                                sx={{
                                    color: "primary.main",
                                }}
                                variant="text"
                            >
                                Change Avatar
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Formik
                    enableReinitialize
                    initialValues={{
                        email: user.email || "",
                        displayName: user.displayName || "",
                        phone: user.phoneNumber || "",
                        submit: null,
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("Must be a valid email")
                            .max(255)
                            .required("Email is required"),
                        displayName: Yup.string()
                            .max(255)
                            .required("First Name is required"),

                        phone: Yup.string(),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting }
                    ): Promise<void> => {
                        try {
                            user.updateProfile({
                                ...values,
                            })
                                .then(() => {
                                    console.log("Successful")
                                })
                                .catch((error) => {
                                    console.log("Nope")
                                })
                            setStatus({ success: true })
                            setSubmitting(false)
                            toast.success("Profile updated!")
                        } catch (err) {
                            console.error(err)
                            toast.error("Something went wrong!")
                            setStatus({ success: false })
                            setErrors({ submit: err.message })
                            setSubmitting(false)
                        }
                    }}
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
                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader title="Profile" />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={4}>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                error={Boolean(
                                                    touched.displayName &&
                                                        errors.displayName
                                                )}
                                                fullWidth
                                                helperText={
                                                    touched.displayName &&
                                                    errors.displayName
                                                }
                                                label="First Name"
                                                name="displayName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.displayName}
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                error={Boolean(
                                                    touched.email &&
                                                        errors.email
                                                )}
                                                fullWidth
                                                helperText={
                                                    touched.email &&
                                                    errors.email
                                                }
                                                label="Email Address"
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                required
                                                type="email"
                                                value={values.email}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                error={Boolean(
                                                    touched.phone &&
                                                        errors.phone
                                                )}
                                                fullWidth
                                                helperText={
                                                    touched.phone &&
                                                    errors.phone
                                                }
                                                label="Phone Number"
                                                name="phone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phone}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    {errors.submit && (
                                        <Box sx={{ mt: 3 }}>
                                            <FormHelperText error>
                                                {errors.submit}
                                            </FormHelperText>
                                        </Box>
                                    )}
                                </CardContent>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        p: 2,
                                    }}
                                >
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Card>
                        </form>
                    )}
                </Formik>
            </Grid>
            <ProfileImageModal open={open} onClose={handleClose} />
        </Grid>
    )
}

export default AccountGeneralSettings
