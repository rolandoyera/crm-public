import toast from "react-hot-toast"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Input from "@mui/material/Input"
import { firebaseAuth } from "lib/firebase"
import { useState } from "react"
import "firebase/storage"
import firebase from "firebase/app"

export default function ProfileImageModal(props) {
    const { open, onClose } = props
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [photoURL, setPhotoURL] = useState()
    const user = firebaseAuth.currentUser
    const storageRef = firebase.storage().ref("profilePictures/profile.jpg")

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }
    async function handleSubmit() {
        setLoading(true)
        await storageRef
            .put(photo)
            .then(async () => await storageRef.getDownloadURL())
            .then(async (url) => await setPhotoURL(url))
            .then(
                async () =>
                    await user.updateProfile({
                        photoURL: photoURL,
                    })
            )
        setTimeout(() => window.location.reload(), 500)
        toast.success("Image Saved")
        setLoading(false)
    }
    console.log(photoURL)

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
            <>
                <DialogTitle>Choose an image</DialogTitle>
                <DialogContent
                    sx={{ width: "400px", height: 150, display: "flex" }}
                >
                    <Input
                        type="file"
                        name="photoURL"
                        fullWidth
                        onChange={handleChange}
                        disabled={loading}
                        disableUnderline
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onClose()}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save Image</Button>
                </DialogActions>
            </>
        </Dialog>
    )
}
