import { FC, useState } from "react"
import List from "@mui/material/List"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import { Link as RouterLink } from "react-router-dom"
import ArrowRightIcon from "icons/ArrowRight"
import Scrollbar from "components/Scrollbar"
import { useGetAllCheckItems } from "lib/useCheckItems"
import { decrement, fireDb } from "lib/firebase"
import toast from "react-hot-toast"
import TaskListItems from "./TaskListItems"
import AllClear from "assets/AllClear"
import Box from "@mui/system/Box"

const OverviewTask: FC = (props) => {
    const { checkItems } = useGetAllCheckItems()
    const [isChecked, setIsChecked] = useState(false)
    const handleStateChange = async (checkItem): Promise<void> => {
        try {
            await fireDb
                .collection("customers")
                .doc(checkItem.customerId)
                .collection("checkItems")
                .doc(checkItem.checkItemId)
                .delete()
            await fireDb
                .collection("customers")
                .doc(checkItem.customerId)
                .update({
                    task: decrement,
                    merge: true,
                })
            toast.success("Tasks Completed")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }
    const waitToDelete = async (e, checkItem) => {
        e.stopPropagation()
        setIsChecked(checkItem.checkItemId)
        setTimeout(() => handleStateChange(checkItem), 500)
    }
    return (
        <Card {...props}>
            <CardHeader title="Tasks" />
            <Scrollbar>
                <List
                    disablePadding
                    sx={{
                        height: {
                            xs: "480px",
                            sm: "400px",
                        },
                        px: 1,
                    }}
                >
                    {checkItems.length > 0 ? (
                        checkItems.map((checkItem) => (
                            <TaskListItems
                                key={checkItem.checkItemId}
                                isChecked={isChecked}
                                checkItem={checkItem}
                                waitToDelete={waitToDelete}
                            />
                        ))
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                height: {
                                    xs: "480px",
                                    sm: "400px",
                                },
                            }}
                        >
                            <AllClear className="fade-in-slow" />
                        </Box>
                    )}
                </List>
            </Scrollbar>
            <CardActions
                sx={{
                    backgroundColor: "background.default",
                    p: 2,
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    variant="outlined"
                    component={RouterLink}
                    to={`/dashboard/customers`}
                >
                    View All Customers
                </Button>
            </CardActions>
        </Card>
    )
}

export default OverviewTask
