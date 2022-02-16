import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import type { Theme } from "@mui/material"
import type { SxProps } from "@mui/system"
import TaskItem from "./TaskItem"
import { useGetCheckItems } from "lib/useCheckItems"
import AllClear from "assets/AllClearOnBike"
import TaskModal from "./TaskModal"

interface TaskListProps {
    setIsExpanded: (boolean) => void
    isExpanded: boolean
    hideSvg: string
    setHideSvg: (string) => void
    customer: any
    sx?: SxProps<Theme>
    className?: string
}

const TaskList: FC<TaskListProps> = (props) => {
    const {
        isExpanded,
        setIsExpanded,
        hideSvg,
        setHideSvg,
        customer,
        ...other
    } = props
    const { id } = useParams()
    const { checkItems } = useGetCheckItems(id)
    const handleClose = () => {
        setIsExpanded(false)
    }

    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsloading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Box pb={3} {...other}>
            {checkItems.length > 0 ? (
                checkItems.map((checkItem) => (
                    <TaskItem
                        checkItem={checkItem}
                        key={checkItem.checkItemId}
                        id={id}
                        customer={customer}
                    />
                ))
            ) : (
                <AllClear className={` ${isLoading ? "hidden" : "visible"}`} />
            )}

            <Box
                sx={{
                    backgroundColor: "background.default",
                    borderRadius: "3px",
                }}
            >
                <TaskModal
                    isExpanded={isExpanded}
                    onClose={handleClose}
                    setIsExpanded={setIsExpanded}
                    customer={customer}
                />
            </Box>
        </Box>
    )
}

export default TaskList
