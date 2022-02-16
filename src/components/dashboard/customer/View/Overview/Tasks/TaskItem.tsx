import { useEffect, useState } from "react"
import type { ChangeEvent, FC } from "react"
import toast from "react-hot-toast"
import { Box, Checkbox, IconButton } from "@mui/material"
import type { Theme } from "@mui/material"
import Typography from "@mui/material/Typography"
import { experimentalStyled } from "@mui/material/styles"
import type { SxProps } from "@mui/system"
import { decrement, fireDb } from "lib/firebase"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import MenuItem from "@mui/material/MenuItem"
import { StyledMenu } from "./StyledMenu"
import TourIcon from "@mui/icons-material/Tour"
import { subHours, formatDistance } from "date-fns"
import ClockIcon from "icons/Clock"
import TaskModalEdit from "./TaskModalEdit"

interface TaskItem {
    checkItem: {
        name: string
        priority: string
        checkItemId: string
        state: string
        completeBy: any
    }

    sx?: SxProps<Theme>
    id: string
    customer: string
}

const TaskItemRoot = experimentalStyled("div")(({ theme }) => ({
    alignItems: "center",
    marginTop: 10,
    marginBottom: "1.8rem",
    borderRadius: "6px",
    display: "flex",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    "&:hover": {
        backgroundColor: theme.palette.background.default,
        "& button": {
            visibility: "visible",
        },
    },
    "&.bg": {
        backgroundColor: theme.palette.background.default,
        "& button": {
            visibility: "visible",
        },
    },
}))

const TasksCheckItem: FC<TaskItem> = (props) => {
    const { checkItem, id, customer, ...other } = props
    const [isChecked, setIsChecked] = useState(false)
    const [name, setName] = useState<string>(checkItem.name)
    const [completeBy, setCompleteBy] = useState<Date | null>(
        checkItem?.completeBy
            ? new Date(checkItem?.completeBy?.seconds * 1000)
            : null
    )
    const [moreAnchorEl, setMoreAnchorEl] = useState(null)
    const openMoreMenu = Boolean(moreAnchorEl)
    const handleCloseMenu = () => {
        setMoreAnchorEl(null)
        setBg("")
    }
    const handleOpenMenu = (event) => {
        setMoreAnchorEl(event.currentTarget)
        setBg("bg")
    }
    const handleStateChange = async (
        event: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        try {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("checkItems")
                .doc(checkItem.checkItemId)
                .delete()
            await fireDb.collection("customers").doc(id).update({
                task: decrement,
                merge: true,
            })
            toast.success("Tasks Completed")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }
    const waitToDelete = async () => {
        setIsChecked(true)
        setTimeout(handleStateChange, 500)
    }
    const handleHighPriority = async () => {
        try {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("checkItems")
                .doc(checkItem.checkItemId)
                .update({
                    name: name,
                    merge: true,
                    priority: "3",
                })
                .then(() => setMoreAnchorEl(null))
            setBg("")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }
    const handleMediumPriority = async () => {
        try {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("checkItems")
                .doc(checkItem.checkItemId)
                .update({
                    name: name,
                    merge: true,
                    priority: "2",
                })
                .then(() => setMoreAnchorEl(null))
            setBg("")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }
    const handleLowPriority = async () => {
        try {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("checkItems")
                .doc(checkItem.checkItemId)
                .update({
                    name: name,
                    merge: true,
                    priority: "1",
                })
                .then(() => setMoreAnchorEl(null))
            setBg("")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    const handleClose = () => {
        setIsExpanded(false)
    }
    const [isExpanded, setIsExpanded] = useState(false)
    const [bg, setBg] = useState("")
    const [pastDueCss, setPastDueCss] = useState("text.secondary")
    const [pastDueClass, setPastDueClass] = useState("")
    const [pastDueText, setPastDueText] = useState("Due")
    const [isItNow, setIsItNow] = useState(new Date())

    useEffect(() => {
        const CheckTime = setInterval(() => {
            setIsItNow(new Date())
            if (new Date() > new Date(checkItem?.completeBy?.seconds * 1000)) {
                setPastDueCss("error.main")
                setPastDueClass("past-due")
                setPastDueText("Past Due")
            } else if (
                new Date() >
                new Date(checkItem?.completeBy?.seconds * 1000 - 3600000)
            ) {
                setPastDueCss("warning.main")
                setPastDueClass("past-due")
                setPastDueText("Almost Due")
            } else {
                setPastDueCss("text.secondary")
                setPastDueClass("")
                setPastDueText("Due")
            }
        }, 1000)
        return () => clearInterval(CheckTime)
    }, [checkItem?.completeBy?.seconds])

    const handleEdit = () => {
        setName(name)
        setIsExpanded(true)
        setCompleteBy(completeBy)
    }

    return (
        <TaskItemRoot {...other} className={`${bg}`}>
            {(() => {
                switch (checkItem.priority) {
                    case "":
                        return (
                            <Checkbox
                                checked={isChecked}
                                onChange={waitToDelete}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                                sx={{
                                    ml: -1,
                                    mr: 1,
                                    borderRadius: "50px",
                                    color: "primary.main",
                                    "&.Mui-checked": {
                                        color: "primary.main",
                                    },
                                }}
                            />
                        )
                    case "1":
                        return (
                            <Checkbox
                                checked={isChecked}
                                onChange={waitToDelete}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                                sx={{
                                    ml: -1,
                                    mr: 1,
                                    borderRadius: "50px",
                                    color: "primary.main",
                                    "&.Mui-checked": {
                                        color: "primary.main",
                                    },
                                }}
                            />
                        )
                    case "2":
                        return (
                            <Checkbox
                                checked={isChecked}
                                onChange={waitToDelete}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                                sx={{
                                    ml: -1,
                                    mr: 1,
                                    borderRadius: "50px",
                                    color: "warning.main",
                                    "&.Mui-checked": {
                                        color: "warning.main",
                                    },
                                }}
                            />
                        )
                    case "3":
                        return (
                            <Checkbox
                                checked={isChecked}
                                onChange={waitToDelete}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                                sx={{
                                    ml: -1,
                                    mr: 1,
                                    borderRadius: "50px",
                                    color: "error.main",
                                    "&.Mui-checked": {
                                        color: "error.main",
                                    },
                                }}
                            />
                        )
                }
            })()}

            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {checkItem.completeBy ? (
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "12px",
                                    height: "12px",
                                    marginTop: "3px",
                                }}
                                className={`${pastDueClass}`}
                            >
                                <ClockIcon
                                    sx={{
                                        color: `${pastDueCss}`,
                                        fontSize: "1rem",
                                        position: "absolute",
                                        top: -2,
                                        left: -2,
                                    }}
                                />
                            </Box>
                            <Typography
                                color="textSecondary"
                                variant="caption"
                                onClick={() => setIsExpanded(true)}
                                sx={{
                                    flexGrow: 1,
                                    cursor: "pointer",
                                    minHeight: 32,
                                    ml: 1,
                                }}
                            >
                                {pastDueText}:{" "}
                                {formatDistance(
                                    subHours(
                                        new Date(
                                            checkItem?.completeBy?.seconds *
                                                1000
                                        ),
                                        0
                                    ),
                                    new Date(isItNow),
                                    { addSuffix: true }
                                )}
                            </Typography>
                        </Box>
                    ) : null}
                    <Typography
                        color="textPrimary"
                        onClick={handleEdit}
                        sx={{
                            flexGrow: 1,
                            cursor: "pointer",
                            minHeight: 32,
                        }}
                        variant="body1"
                    >
                        {checkItem.name}
                    </Typography>
                </Box>
                <IconButton
                    onClick={handleOpenMenu}
                    sx={{ mt: 0.4, visibility: "hidden" }}
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>
                <StyledMenu
                    id="more-options"
                    open={openMoreMenu}
                    onClose={handleCloseMenu}
                    anchorEl={moreAnchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem>
                        <Typography
                            color="textPrimary"
                            sx={{
                                fontSize: ".85rem",
                                fontWeight: 600,
                            }}
                        >
                            Priority
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLowPriority}>
                        <TourIcon color="primary" sx={{ marginRight: 1.5 }} />
                        <Typography
                            color="textSecondary"
                            sx={{
                                fontSize: ".85rem",
                                fontWeight: 600,
                            }}
                        >
                            Low
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleMediumPriority}>
                        <TourIcon color="warning" sx={{ marginRight: 1.5 }} />
                        <Typography
                            color="textSecondary"
                            sx={{
                                fontSize: ".85rem",
                                fontWeight: 600,
                            }}
                        >
                            Medium
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleHighPriority}>
                        <TourIcon color="error" sx={{ marginRight: 1.5 }} />
                        <Typography
                            color="textSecondary"
                            sx={{
                                fontSize: ".85rem",
                                fontWeight: 600,
                            }}
                        >
                            High
                        </Typography>
                    </MenuItem>
                </StyledMenu>
            </Box>

            <TaskModalEdit
                isExpanded={isExpanded}
                onClose={handleClose}
                setIsExpanded={setIsExpanded}
                customer={customer}
                setName={setName}
                name={name}
                checkItem={checkItem}
                completeBy={completeBy}
                setCompleteBy={setCompleteBy}
            />
        </TaskItemRoot>
    )
}

export default TasksCheckItem
