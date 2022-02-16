import toast from "react-hot-toast"
import { useState } from "react"
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Card,
    CardHeader,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import EditIcon from "@mui/icons-material/Edit"
import TrashIcon from "icons/Trash"
import PlusIcon from "icons/Plus"
import { useParams, useNavigate } from "react-router-dom"
import { useGetDependents } from "lib/useDependents"

const DependentDetailsView = ({ customer, ...props }) => {
    const user = firebaseAuth.currentUser
    const [value, setValue] = useState()
    const navigate = useNavigate()
    const { id } = useParams()
    const { dependents } = useGetDependents(id)

    function Row(props) {
        const { row } = props

        const onDelete = async () => {
            if (window.confirm("This action cannot be undone. Are you sure?")) {
                await fireDb
                    .collection("customers")
                    .doc(id)
                    .collection("dependents")
                    .doc(row.dependentId)
                    .delete()
                await fireDb
                    .collection("customers")
                    .doc(id)
                    .collection("events")
                    .add({
                        user: user.displayName,
                        createdAt: serverTimestamp(),
                        customerId: id,
                        customerName:
                            customer.holderFirstName +
                            " " +
                            customer.holderLastName,
                        action:
                            row.dependentFirstName +
                            " " +
                            row.dependentLastName +
                            " Deleted From Dependents",
                        type: "Dependent",
                    })
                    .then(() => {
                        toast.success("Dependent Deleted")
                    })
                    .catch((error) => {
                        toast.error("Something went wrong")
                        console.error(error)
                    })
            }
        }

        return (
            <>
                <TableRow className="form-table-row">
                    <TableCell>
                        <IconButton
                            color="primary"
                            onClick={() =>
                                navigate(
                                    `/dashboard/customers/${id}/dependent/${row.dependentId}`
                                )
                            }
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" onClick={onDelete}>
                            <TrashIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.dependentFirstName || "-"}{" "}
                            {row.dependentLastName || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.dependentDOB || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.dependentSSN || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.dependentCitizenship || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.dependentRelation || "-"}
                        </Typography>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    return (
        <Card {...props}>
            <CardHeader title="Dependent Details" />
            <Divider />
            <Box sx={{ width: "100%", overflow: "auto", maxHeight: "460px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Actions
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    DOB
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    SSN
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Citizenship
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Relationship
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dependents.map((row, i) => (
                            <Row key={i} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction
                    className="bottom-nav"
                    label="Add Dependent"
                    icon={<PlusIcon color="primary" fontSize="small" />}
                    onClick={() =>
                        navigate(`/dashboard/customers/add-dependent/${id}`)
                    }
                />
            </BottomNavigation>
        </Card>
    )
}

export default DependentDetailsView
