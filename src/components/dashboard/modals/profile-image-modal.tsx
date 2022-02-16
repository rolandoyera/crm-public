import toast from "react-hot-toast"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { firebaseAuth, storage } from "lib/firebase"
import { Input } from "@mui/material"
import { useState } from "react"

export default function ProfileImageModal(props) {
    const { open, onClose } = props
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const user = firebaseAuth.currentUser

    function handleChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => {
        setLoading(true)
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setLoading(true)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url)
                        user.updateProfile({
                            photoURL: url,
                        })
                    })
            }
        )
        setTimeout(() => window.location.reload(), 500)
        toast.success("Image Saved")
        setLoading(false)
    }
    console.log("url", url)

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
                    <Button onClick={handleUpload}>Save Image</Button>
                </DialogActions>
            </>
        </Dialog>
    )
}
