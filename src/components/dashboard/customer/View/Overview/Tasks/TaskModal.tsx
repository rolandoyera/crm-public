import type { ChangeEvent } from "react"
import { useState } from "react"
import { fireDb, increment } from "lib/firebase"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import DateTimePicker from "@mui/lab/DateTimePicker"
import Dialog from "@mui/material/Dialog"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import TextField from "@mui/material/TextField"
import Picker from "emoji-picker-react"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import { Grid } from "@mui/material"

const TasksModal = (props) => {
    const { isExpanded, setIsExpanded, hideSvg, customer, onClose, ...other } =
        props
    const { id } = useParams()
    const [name, setName] = useState<string>("")
    const [start, setStart] = useState(null)
    const [toDoPriority, setTasksPriority] = useState<string>("")
    const [showPicker, setShowPicker] = useState("0px")
    const onEmojiClick = (event, emojiObject) => {
        setName((prevInput) => prevInput + " " + emojiObject.emoji + "  ")
        setShowPicker("0px")
    }
    const handleCancel = (): void => {
        setIsExpanded(false)
        setName("")
        setStart(null)
        setShowPicker("0px")
    }
    const handlePriorityChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setTasksPriority(event.target.value)
    }
    const handleSave = async (e): Promise<void> => {
        e.preventDefault()
        setIsExpanded(false)
        try {
            if (!name) {
                return
            }
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("checkItems")
                .doc()
                .set({
                    name: name,
                    state: "incomplete",
                    customerId: id,
                    holderFirstName: customer.holderFirstName,
                    holderLastName: customer.holderLastName,
                    priority: toDoPriority,
                    completeBy: start || null,
                })
            await fireDb.collection("customers").doc(id).update({
                task: increment,
                merge: true,
            })
            setName("")
            setStart(null)
            toast.success("Tasks added")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value)
    }
    const handleEmojiWindow = () => {
        if (showPicker === "0px") {
            setShowPicker("400px")
        } else {
            setShowPicker("0px")
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={isExpanded}
            {...other}
        >
            <Box
                sx={{
                    p: 3,
                    "& .emoji-group": {
                        background: "transparent",
                    },
                    "& .emoji-categories": {
                        mb: 1,
                    },
                    "& .emoji-picker-react .emoji-categories button": {
                        backgroundColor: "white",
                        opacity: 1,
                        padding: "2px 15px",
                        height: "30px",
                        my: 2,
                        mb: 1.1,
                        borderRadius: "6px",
                    },
                    "& .emoji-picker-react .emoji-group:before": {
                        background: "transparent",
                        backgroundColor: "background.paper",
                        opacity: 1,
                        my: 1,
                        pl: 1,
                        color: "text.primary",
                        borderRadius: "6px",
                    },
                    "& input": {
                        backgroundColor: "background.paper",
                        color: "text.primary",
                    },
                    "& .emoji-picker-react input.emoji-search": {
                        border: "1px solid",
                        borderColor: "text.secondary",
                    },
                    "& .emoji-scroll-wrapper::-webkit-scrollbar": {
                        width: "0",
                    },
                    "& .emoji-picker-react .active-category-indicator-wrapper .active-category-indicator":
                        {
                            left: "0",
                            mb: 1,
                        },
                    "& aside.emoji-picker-react": {
                        borderColor: "text.secondary",
                    },
                }}
            >
                <form onSubmit={handleSave}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        placeholder="Add a task"
                        value={name}
                        variant="outlined"
                        autoComplete="off"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{ cursor: "pointer", mr: -1.4, pr: 0 }}
                                >
                                    <IconButton onClick={handleEmojiWindow}>
                                        <InsertEmoticonIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box
                        sx={{
                            height: `${showPicker}`,
                            overflow: "hidden",
                            transition: "all .2s",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Picker
                            pickerStyle={{
                                width: "100%",
                                boxShadow: "none",
                                background: "transparent",
                            }}
                            onEmojiClick={onEmojiClick}
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <DateTimePicker
                            label="Complete By"
                            onChange={(date) => setStart(date)}
                            renderInput={(inputProps) => (
                                <TextField fullWidth {...inputProps} />
                            )}
                            value={start}
                        />
                    </Box>
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            mt: 2,
                        }}
                    >
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    Priority
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="priority"
                                    name="priority"
                                    onChange={handlePriorityChange}
                                >
                                    <FormControlLabel
                                        value="1"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#5a78e6",
                                                    "&.Mui-checked": {
                                                        color: "#5a78e6",
                                                    },
                                                }}
                                            />
                                        }
                                        label="1"
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#f59800",
                                                    "&.Mui-checked": {
                                                        color: "#f59800",
                                                    },
                                                }}
                                            />
                                        }
                                        label="2"
                                    />
                                    <FormControlLabel
                                        value={"3"}
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#f44336",
                                                    "&.Mui-checked": {
                                                        color: "#f44336",
                                                    },
                                                }}
                                            />
                                        }
                                        label="3"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            display={"flex"}
                            justifyContent={"right"}
                            xs={12}
                            sm={6}
                            sx={{
                                mt: {
                                    xs: 2,
                                    sm: 0,
                                },
                            }}
                        >
                            <Button
                                color="primary"
                                onClick={handleCancel}
                                size="small"
                                variant="text"
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                size="small"
                                sx={{ ml: 2 }}
                                variant="contained"
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Dialog>
    )
}

export default TasksModal
