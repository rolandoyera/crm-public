import { useState } from "react"
import type { ChangeEvent, FC } from "react"
import PropTypes from "prop-types"
import toast from "react-hot-toast"
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    TextField,
    Typography,
} from "@mui/material"
import type { Theme } from "@mui/material"
import { experimentalStyled } from "@mui/material/styles"
import type { SxProps } from "@mui/system"
import TrashIcon from "../../../icons/Trash"
import { deleteCheckItem, updateCheckItem } from "../../../slices/kanban"
import { useDispatch } from "../../../store"
import type { CheckItem } from "../../../types/kanban"

interface KanbanCheckItemProps {
    cardId: string
    checkItem: CheckItem
    checklistId: string
    editing?: boolean
    onEditCancel?: () => void
    onEditComplete?: () => void
    onEditInit?: () => void
    sx?: SxProps<Theme>
}

const KanbanCheckItemRoot = experimentalStyled("div")(({ theme }) => ({
    alignItems: "flex-start",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    padding: theme.spacing(1),
    "&:hover": {
        backgroundColor: theme.palette.background.default,
        "& button": {
            visibility: "visible",
        },
    },
}))

const KanbanCheckItem: FC<KanbanCheckItemProps> = (props) => {
    const {
        cardId,
        checkItem,
        checklistId,
        editing,
        onEditCancel,
        onEditComplete,
        onEditInit,
        ...other
    } = props
    const dispatch = useDispatch()
    const [name, setName] = useState<string>(checkItem.name)

    const handleStateChange = async (
        event: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        try {
            const state = event.target.checked ? "complete" : "incomplete"

            await dispatch(
                updateCheckItem(cardId, checklistId, checkItem.checkItemId, {
                    state,
                })
            )
            toast.success("Check item updated!")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value)
    }

    const handleSave = async (): Promise<void> => {
        try {
            await dispatch(
                updateCheckItem(cardId, checklistId, checkItem.checkItemId, {
                    name,
                })
            )
            toast.success("Check item updated!")

            if (onEditComplete) {
                onEditComplete()
            }
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    const handleCancel = (): void => {
        setName(checkItem.name)

        if (onEditCancel) {
            onEditCancel()
        }
    }

    const handleDelete = async (): Promise<void> => {
        try {
            await dispatch(
                deleteCheckItem(cardId, checklistId, checkItem.checkItemId)
            )
            toast.success("Check item deleted!")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    return (
        <KanbanCheckItemRoot {...other}>
            <Checkbox
                checked={checkItem.state === "complete"}
                color="primary"
                onChange={handleStateChange}
                sx={{
                    ml: -1,
                    mr: 1,
                }}
            />
            {editing ? (
                <Box sx={{ flexGrow: 1 }}>
                    <TextField
                        fullWidth
                        onChange={handleNameChange}
                        value={name}
                        variant="outlined"
                    />
                    <Box sx={{ mt: 1 }}>
                        <Button
                            color="primary"
                            onClick={handleSave}
                            size="small"
                            variant="contained"
                        >
                            Save
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleCancel}
                            size="small"
                            variant="text"
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexGrow: 1,
                    }}
                >
                    <Typography
                        color="textPrimary"
                        onClick={onEditInit}
                        sx={{
                            flexGrow: 1,
                            cursor: "pointer",
                            minHeight: 32,
                        }}
                        variant="body1"
                    >
                        {checkItem.name}
                    </Typography>
                    <IconButton
                        onClick={handleDelete}
                        sx={{ visibility: "hidden" }}
                    >
                        <TrashIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </KanbanCheckItemRoot>
    )
}

KanbanCheckItem.propTypes = {
    cardId: PropTypes.string.isRequired,
    // @ts-ignore
    checkItem: PropTypes.object.isRequired,
    checklistId: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    onEditCancel: PropTypes.func,
    onEditComplete: PropTypes.func,
    onEditInit: PropTypes.func,
    sx: PropTypes.object,
}

KanbanCheckItem.defaultProps = {
    editing: false,
}

export default KanbanCheckItem
