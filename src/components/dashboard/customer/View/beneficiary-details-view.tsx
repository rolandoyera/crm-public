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
import { useConfirmation } from "contexts/ConfirmContext/ConfirmationServiceContext"

const BeneficiaryDetailsView = ({ customer, beneficiaries, ...props }) => {
    const user = firebaseAuth.currentUser
    const [value, setValue] = useState()
    const navigate = useNavigate()
    const { id } = useParams()
    const confirm = useConfirmation()

    function Row(props) {
        const { row } = props
        const useConfirm = () => {
            confirm({
                catchOnCancel: true,
                title: "Are you sure?",
                description: "This action cannot be undone.",
            })
                .then(() => onDelete())
                .catch(() => null)
        }
        const onDelete = async () => {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("beneficiaries")
                .doc(row.beneficiaryId)
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
                        row.beneficiaryFirstName +
                        " " +
                        row.beneficiaryLastName +
                        " Deleted From Beneficiaries",
                    type: "Beneficiary",
                })
                .then(() => {
                    toast.success("Beneficiary Deleted")
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })
        }

        return (
            <>
                <TableRow className="form-table-row">
                    <TableCell>
                        <IconButton
                            color="primary"
                            onClick={() =>
                                navigate(
                                    `/dashboard/customers/${id}/beneficiary/${row.beneficiaryId}`
                                )
                            }
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" onClick={useConfirm}>
                            <TrashIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.beneficiaryFirstName || "-"}{" "}
                            {row.beneficiaryLastName || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.beneficiaryDOB || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.beneficiarySSN || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.beneficiaryRelation || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.beneficiaryPhoneNumber || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textSecondary" variant="body2">
                            {row.beneficiaryEmail || "-"}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography color="textPrimary" variant="body2">
                            {row.beneficiaryPercentage || "-"}
                            {"%"}
                        </Typography>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    return (
        <Card {...props}>
            <CardHeader title="Beneficiary Details" />
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
                                    Relationship
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Phone No
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Percentage Amt
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {beneficiaries.map((row, i) => (
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
                    label="Add Beneficiary"
                    icon={<PlusIcon color="primary" fontSize="small" />}
                    onClick={() =>
                        navigate(`/dashboard/customers/add-beneficiary/${id}`)
                    }
                />
            </BottomNavigation>
        </Card>
    )
}

export default BeneficiaryDetailsView
