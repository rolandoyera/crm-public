import { FC, useState } from "react"
import { Box, Card, CardHeader, Divider } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import TaskList from "./TaskList"
import PlusIcon from "icons/Plus"
import Scrollbar from "components/Scrollbar"

interface TasksProps {
    customer: string
    className?: string
}

const Tasks: FC<TasksProps> = (props) => {
    const { customer, ...other } = props
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [hideSvg, setHideSvg] = useState("visible")

    const handleAdd = (): void => {
        setHideSvg("hidden")
        setIsExpanded(true)
    }

    return (
        <Card {...other} sx={{ position: "relative" }}>
            <CardHeader title={"Tasks"} />
            <Divider />
            <Scrollbar>
                <Box sx={{ p: 3, height: "370px" }}>
                    <Box sx={{ mt: 1.5 }}>
                        <TaskList
                            className="fade-in-full"
                            isExpanded={isExpanded}
                            setIsExpanded={setIsExpanded}
                            sx={{ mb: 3 }}
                            hideSvg={hideSvg}
                            setHideSvg={setHideSvg}
                            customer={customer}
                        />
                    </Box>
                </Box>
            </Scrollbar>
            <BottomNavigation showLabels>
                <BottomNavigationAction
                    className="bottom-nav"
                    label="Add New Task"
                    onClick={handleAdd}
                    icon={<PlusIcon color="primary" fontSize="small" />}
                />
            </BottomNavigation>
        </Card>
    )
}

export default Tasks
