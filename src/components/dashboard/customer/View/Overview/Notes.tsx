import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import TextSnippetIcon from "@mui/icons-material/TextSnippet"
import Timeline from "@mui/lab/Timeline"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import Typography from "@mui/material/Typography"
import EditIcon from "@mui/icons-material/Edit"
import Scrollbar from "components/Scrollbar"
import { useGetCustomerNotes } from "lib/useNotes"
import {
    decrement,
    firebaseAuth,
    fireDb,
    increment,
    serverTimestamp,
} from "lib/firebase"
import SaveIcon from "icons/Save"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
import TrashIcon from "icons/Trash"
import NoNotes from "assets/NoNotes"
import FavoriteIcon from "@mui/icons-material/Favorite"

interface NoteProps {
    note: string
    noteId?: string
}

const initialState = {
    note: "",
}

const Notes = ({ id }) => {
    const user = firebaseAuth.currentUser
    const { notes } = useGetCustomerNotes(id)
    const [customerNotes, setCustomerNotes] = useState<NoteProps>(initialState)
    const [open, setOpen] = useState(false)

    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsloading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setOpen(false)
        if (!customerNotes.noteId) {
            try {
                await fireDb
                    .collection("customers")
                    .doc(id)
                    .collection("notes")
                    .add({
                        ...customerNotes,
                        createdAt: serverTimestamp(),
                        user: user.displayName,
                        noteFrom: "Dashboard Note",
                    })
                await fireDb.collection("customers").doc(id).update({
                    notes: increment,
                    merge: true,
                })
            } catch (err) {
                console.error(err)
            }
        } else {
            try {
                await fireDb
                    .collection("customers")
                    .doc(id)
                    .collection("notes")
                    .doc(customerNotes.noteId)
                    .update({ ...customerNotes, merge: true })
            } catch (err) {
                console.error(err)
            }
        }
        setCustomerNotes({ note: "" })
    }

    const handleClose = (): void => {
        setOpen(false)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setCustomerNotes({
            ...customerNotes,
            [name]: value,
        })
    }
    const handleOpen = (x) => {
        setCustomerNotes({
            note: x.note,
            noteId: x.noteId,
        })
        setOpen(true)
    }
    const handleOpenNew = () => {
        setOpen(true)
        setCustomerNotes({
            note: "",
        })
    }
    const onDelete = async (x) => {
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("notes")
            .doc(x.noteId)
            .delete()
        await fireDb
            .collection("customers")
            .doc(id)
            .update({
                notes: decrement,
                merge: true,
            })
            .then(() => {
                toast.success("Note Deleted")
            })
            .catch((error) => {
                toast.error("Something went wrong")
                console.error(error)
            })
    }
    return (
        <>
            <Card>
                <CardHeader title={"Notes"} />
                <Divider />
                <Scrollbar>
                    <Box
                        sx={{
                            height: "370px",
                            display: "flex",
                            mb: 0,
                            pb: 0,
                        }}
                    >
                        <CardContent
                            sx={{
                                width: "100%",
                            }}
                        >
                            {notes.length > 0 ? (
                                <Timeline
                                    className="fade-in-full"
                                    sx={{ px: 0 }}
                                >
                                    {notes.map((x, i) => (
                                        <TimelineItem key={i}>
                                            <TimelineSeparator>
                                                {(() => {
                                                    switch (x.noteFrom) {
                                                        case "Health Policy Note":
                                                            return (
                                                                <TimelineDot
                                                                    sx={{
                                                                        bgcolor:
                                                                            "primary.light",
                                                                    }}
                                                                >
                                                                    <FavoriteIcon />
                                                                </TimelineDot>
                                                            )
                                                        default:
                                                            return (
                                                                <TimelineDot variant="outlined">
                                                                    <TextSnippetIcon
                                                                        sx={{
                                                                            color: "textSecondary",
                                                                        }}
                                                                    />
                                                                </TimelineDot>
                                                            )
                                                    }
                                                })()}
                                            </TimelineSeparator>
                                            <TimelineContent
                                                sx={{
                                                    mt: "3rem",
                                                    py: 2,
                                                    ml: ".7rem",
                                                    minHeight: "100px",
                                                    backgroundColor:
                                                        "background.default",
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    flexDirection: "column",
                                                    borderRadius: "6px",
                                                    position: "relative",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "10px",
                                                        height: "10px",
                                                        position: "absolute",
                                                        backgroundColor:
                                                            "background.default",
                                                        transform:
                                                            "rotate(45deg)",
                                                        left: -5,
                                                        top: 25,
                                                    }}
                                                ></Box>
                                                <Box sx={{ display: "flex" }}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                        {new Date(
                                                            x?.createdAt
                                                                ?.seconds * 1000
                                                        ).toLocaleDateString(
                                                            [],
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        )}{" "}
                                                        at{" "}
                                                        {new Date(
                                                            x?.createdAt
                                                                ?.seconds * 1000
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </Typography>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() =>
                                                            handleOpen(x)
                                                        }
                                                        sx={{
                                                            ml: 1,
                                                            mt: -1,
                                                            padding: "8px",
                                                        }}
                                                    >
                                                        <EditIcon
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            onDelete(x)
                                                        }
                                                        sx={{
                                                            ml: 1,
                                                            mt: -1,
                                                            padding: "8px",
                                                        }}
                                                    >
                                                        <TrashIcon
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Typography
                                                        mb={1}
                                                        mr={1}
                                                        color="textPrimary"
                                                        variant="subtitle2"
                                                    >
                                                        {x.noteFrom} -
                                                    </Typography>
                                                    <Typography
                                                        mb={1}
                                                        fontStyle={"italic"}
                                                        fontWeight={300}
                                                        color="textPrimary"
                                                        variant="subtitle2"
                                                    >
                                                        {x.user}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {x.note}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            ) : (
                                <NoNotes
                                    className={` ${
                                        isLoading ? "hidden" : "visible"
                                    }`}
                                />
                            )}
                        </CardContent>
                    </Box>
                </Scrollbar>

                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="Add New Note"
                        icon={
                            <TextSnippetIcon color="primary" fontSize="small" />
                        }
                        onClick={handleOpenNew}
                    />
                </BottomNavigation>
            </Card>
            <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
                <Box sx={{ p: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5}>
                            <Grid item sm={8} xs={12}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        multiline
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
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Dialog>
        </>
    )
}

export default Notes
