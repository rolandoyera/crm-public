import { useState } from "react"
import type { ChangeEvent, FC } from "react"
import toast from "react-hot-toast"
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material"
import { fireDb } from "lib/firebase"
import { MobileDateTimePicker } from "@mui/lab"

interface TaskItemAddProps {
    id?: string
    isExpanded: Boolean
    setIsExpanded: any
    setHideSvg: (string) => void
    customer: {
        holderFirstName: string
        holderLastName: string
    }
}

const TaskItemAdd: FC<TaskItemAddProps> = (props) => {
    const { isExpanded, setIsExpanded, setHideSvg, id, customer, ...other } =
        props
    const [name, setName] = useState<string>("")
    const [start, setStart] = useState(null)
    const [toDoPriority, setTasksPriority] = useState<string>("")

    const handleCancel = (): void => {
        setHideSvg("visible")
        setIsExpanded(false)
        setName("")
        setStart(null)
    }

    const handlePriorityChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setTasksPriority(event.target.value)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value)
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
                    customerName:
                        customer.holderFirstName +
                        " " +
                        customer.holderLastName,
                    priority: toDoPriority,
                    // completeBy: new Date(start),
                    completeBy: start,
                })

            setName("")
            setStart(null)
            toast.success("Tasks added")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    return (
        <Box {...other} mt={1}>
            {isExpanded ? (
                <Box sx={{ pl: 6, pr: 1, pt: 1, pb: 1 }}>
                    <form onSubmit={handleSave}>
                        <TextField
                            fullWidth
                            onChange={handleChange}
                            placeholder="Add a task"
                            value={name}
                            variant="outlined"
                            autoComplete="new-password"
                        />
                        <Box sx={{ mt: 2 }}>
                            <MobileDateTimePicker
                                label="Complete By"
                                onChange={(date) => setStart(date)}
                                renderInput={(inputProps) => (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        {...inputProps}
                                    />
                                )}
                                value={start}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                mt: 2,
                            }}
                        >
                            <Box>
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
                                            value="#5a78e6"
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
                                            value="#ff9800"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: "#ff9800",
                                                        "&.Mui-checked": {
                                                            color: "#ff9800",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="2"
                                        />
                                        <FormControlLabel
                                            value="#f44336"
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
                            </Box>

                            <Box>
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
                            </Box>
                        </Box>
                    </form>
                </Box>
            ) : null}
        </Box>
    )
}

export default TaskItemAdd
