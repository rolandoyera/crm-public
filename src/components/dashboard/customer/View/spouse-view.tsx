import { useState } from "react"
import toast from "react-hot-toast"
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Card,
    CardHeader,
    Collapse,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material"
import PencilAltIcon from "icons/PencilAlt"
import DeleteIcon from "@mui/icons-material/Delete"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import PlusIcon from "icons/Plus"
import { useParams, useNavigate } from "react-router-dom"
import { formatIncome } from "../helpers"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"

const SpouseView = ({ customer, ...props }) => {
    const user = firebaseAuth.currentUser
    const [value, setValue] = useState()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const formattedSpouseIncome = formatIncome(customer?.spouseIncome)

    const handleRemove = async () => {
        if (window.confirm("This action cannot be undone. Are you sure?")) {
            await fireDb.collection("customers").doc(id).update({
                spouse: "No",
                updatedAt: serverTimestamp(),
                spouseFirstName: null,
                spouseMiddleName: null,
                spouseLastName: null,
                spouseEmail: null,
                spousePhoneNumber: null,
                spouseAltPhoneNumber: null,
                spouseAddress: null,
                spouseZip: null,
                spouseCitizenship: null,
                spouseCity: null,
                spouseState: null,
                spouseDOB: null,
                spouseTobacco: null,
                merge: true,
            })
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
                        customer.spouseFirstName +
                        " " +
                        customer.spouseLastName +
                        " Deleted As Spouse",
                    type: "Spouse",
                })
                .then(() => {
                    toast.success("Spouse Removed")
                })
            window.location.reload()
        }
    }

    return (
        <Card {...props}>
            <CardHeader title="Spouse Details" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography
                                sx={{ display: "inline" }}
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                Spouse
                            </Typography>
                            {customer?.spouse === "Yes" ? (
                                <IconButton
                                    disabled={
                                        customer?.spouseAddress === false
                                            ? false
                                            : true
                                    }
                                    sx={{ ml: 1 }}
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </IconButton>
                            ) : (
                                <IconButton
                                    sx={{ ml: 1 }}
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/customers/add-spouse/${id}`
                                        )
                                    }
                                >
                                    <PlusIcon fontSize="small" />
                                </IconButton>
                            )}
                        </TableCell>
                        <TableCell>
                            {customer?.spouse === "Yes" ? (
                                <>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {customer?.spouseFirstName
                                            ? customer?.spouseFirstName
                                            : ""}{" "}
                                        {customer?.spouseLastName}
                                    </Typography>
                                </>
                            ) : null}
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell colSpan={1}>
                            <Typography color="textPrimary" variant="subtitle2">
                                First Name
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseFirstName || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Last Name
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseLastName || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell colSpan={1}>
                            <Typography color="textPrimary" variant="subtitle2">
                                Email
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseEmail || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Phone
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spousePhoneNumber || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell colSpan={1}>
                            <Typography color="textPrimary" variant="subtitle2">
                                Alt Phone
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseAltPhoneNumber || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            ></Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            ></Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                DOB
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseDOB || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                SSN
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseSSN || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Citizenship
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseCitizenship || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Tobacco Use
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseTobacco || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Employer
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer?.spouseEmployer || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Annual Income
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {"$"} {formattedSpouseIncome || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    {customer?.spouseAddress ? (
                        <TableRow>
                            <TableCell
                                sx={{ p: 0, m: 0, borderBottom: "unset" }}
                                colSpan={6}
                            >
                                <Collapse
                                    in={open}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <Box>
                                        <Table aria-label="spouse-info">
                                            <TableBody>
                                                <TableRow className="form-table-row">
                                                    <TableCell colSpan={1}>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="subtitle2"
                                                        >
                                                            Email
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="body2"
                                                        >
                                                            {customer?.spouseEmail ||
                                                                "-"}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="subtitle2"
                                                        >
                                                            Phone
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="body2"
                                                        >
                                                            {customer?.spousePhoneNumber ||
                                                                "-"}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    ) : null}
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            ></Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            ></Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            ></Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                {customer?.spouse === "Yes" ? null : (
                    <BottomNavigationAction
                        className="bottom-nav"
                        disabled={customer?.spouse === "Yes" ? true : false}
                        label="Add Spouse"
                        icon={<PlusIcon color="primary" fontSize="small" />}
                        onClick={() =>
                            navigate(`/dashboard/customers/add-spouse/${id}`)
                        }
                    />
                )}
                {customer?.spouse === "Yes" ? (
                    <BottomNavigationAction
                        className="bottom-nav"
                        disabled={customer?.spouse === "No" ? true : false}
                        label="Remove"
                        icon={<DeleteIcon color="error" fontSize="small" />}
                        onClick={handleRemove}
                    />
                ) : null}
                {customer?.spouse === "Yes" ? (
                    <BottomNavigationAction
                        className="bottom-nav"
                        disabled={customer?.spouse === "No" ? true : false}
                        label="Edit"
                        icon={
                            <PencilAltIcon color="primary" fontSize="small" />
                        }
                        onClick={() =>
                            navigate(`/dashboard/customers/edit-spouse/${id}`)
                        }
                    />
                ) : null}
            </BottomNavigation>
        </Card>
    )
}

export default SpouseView
