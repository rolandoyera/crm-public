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
    const [file, setFile] = useState(null)
    const [url, setURL] = useState("")
    const [loading, setLoading] = useState(false)
    const user = firebaseAuth.currentUser

    function handleChange(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const handleUpload = () => {
        setLoading(true)
        const ref = storage.ref(`/images/${file.name}`)
        const uploadTask = ref.put(file)
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref.getDownloadURL().then((url) => {
                setFile(null)
                setURL(url)
                user.updateProfile({
                    photoURL: url,
                })
            })
        })

        toast.success("Image Saved")
        setTimeout(() => window.location.reload(), 2000)
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
