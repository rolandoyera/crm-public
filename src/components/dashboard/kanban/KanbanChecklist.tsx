import { useState } from "react"
import type { ChangeEvent, FC } from "react"
import PropTypes from "prop-types"
import toast from "react-hot-toast"
import {
    Box,
    Button,
    LinearProgress,
    TextField,
    Typography,
} from "@mui/material"
import type { Theme } from "@mui/material"
import { experimentalStyled } from "@mui/material/styles"
import type { SxProps } from "@mui/system"
import ClipboardListIcon from "../../../icons/ClipboardList"
import { deleteChecklist, updateChecklist } from "../../../slices/kanban"
import { useDispatch } from "../../../store"
import type { Card, Checklist } from "../../../types/kanban"
import KanbanCheckItem from "./KanbanCheckItem"
import KanbanCheckItemAdd from "./KanbanCheckItemAdd"

interface KanbanChecklistProps {
    card: Card
    checklist: Checklist
    sx?: SxProps<Theme>
}

const KanbanChecklistRoot = experimentalStyled("div")``

const KanbanChecklist: FC<KanbanChecklistProps> = (props) => {
    const { card, checklist, ...other } = props
    const dispatch = useDispatch()
    const [name, setName] = useState<string>(checklist.name)
    const [editingName, setEditingName] = useState<boolean>(false)
    const [editingCheckItem, setEditingCheckItem] = useState<string | null>(
        null
    )

    const handleNameEdit = (): void => {
        setEditingName(true)
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value)
    }

    const handleNameSave = async (): Promise<void> => {
        try {
            if (!name || name === checklist.name) {
                setEditingName(false)
                setName(checklist.name)
                return
            }

            setEditingName(false)
            await dispatch(updateChecklist(card.id, checklist.id, { name }))
            toast.success("Checklist updated!")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    const handleNameCancel = (): void => {
        setEditingName(false)
        setName(checklist.name)
    }

    const handleDelete = async (): Promise<void> => {
        try {
            await dispatch(deleteChecklist(card.id, checklist.id))
            toast.success("Checklist deleted!")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    const handleCheckItemEditInit = (checkItemId: string): void => {
        setEditingCheckItem(checkItemId)
    }

    const handleCheckItemEditCancel = (): void => {
        setEditingCheckItem(null)
    }

    const handleCheckItemEditComplete = (): void => {
        setEditingCheckItem(null)
    }

    const totalCheckItems = checklist.checkItems.length
    const completedCheckItems = checklist.checkItems.filter(
        (checkItem) => checkItem.state === "complete"
    ).length
    const completePercentage =
        totalCheckItems === 0
            ? 100
            : (completedCheckItems / totalCheckItems) * 100

    return (
        <KanbanChecklistRoot {...other}>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <Box sx={{ mr: 3 }}>
                    <ClipboardListIcon fontSize="small" />
                </Box>
                {editingName ? (
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
                                onClick={handleNameSave}
                                size="small"
                                variant="contained"
                            >
                                Save
                            </Button>
                            <Button
                                color="primary"
                                onClick={handleNameCancel}
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
                            onClick={handleNameEdit}
                            variant="h6"
                        >
                            {checklist.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            color="primary"
                            onClick={handleDelete}
                            size="small"
                            variant="text"
                        >
                            Delete
                        </Button>
                    </Box>
                )}
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    mt: 1,
                }}
            >
                <Typography color="textSecondary" variant="caption">
                    {Math.round(completePercentage)}%
                </Typography>
                <Box
                    sx={{
                        flexGrow: 1,
                        ml: 2,
                    }}
                >
                    <LinearProgress
                        color="primary"
                        value={completePercentage}
                        variant="determinate"
                    />
                </Box>
            </Box>
            {checklist.checkItems.map((checkItem) => (
                <KanbanCheckItem
                    cardId={card.id}
                    checkItem={checkItem}
                    checklistId={checklist.id}
                    editing={editingCheckItem === checkItem.checkItemId}
                    key={checkItem.checkItemId}
                    onEditCancel={handleCheckItemEditCancel}
                    onEditComplete={handleCheckItemEditComplete}
                    onEditInit={(): void =>
                        handleCheckItemEditInit(checkItem.checkItemId)
                    }
                />
            ))}
            <Box
                sx={{
                    ml: 6,
                    mt: 1,
                }}
            >
                <KanbanCheckItemAdd
                    cardId={card.id}
                    checklistId={checklist.id}
                />
            </Box>
        </KanbanChecklistRoot>
    )
}

KanbanChecklist.propTypes = {
    // @ts-ignore
    card: PropTypes.object.isRequired,
    // @ts-ignore
    checklist: PropTypes.object.isRequired,
    sx: PropTypes.object,
}

export default KanbanChecklist
