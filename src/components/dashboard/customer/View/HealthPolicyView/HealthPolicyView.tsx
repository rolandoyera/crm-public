import { useParams, useNavigate } from "react-router-dom"
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Card,
    Divider,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material"
import { StyledMenu } from "./StyledMenu"
import toast from "react-hot-toast"
import PencilAltIcon from "icons/PencilAlt"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CancelIcon from "@mui/icons-material/Cancel"
import TrashIcon from "icons/Trash"
import {
    decrement,
    firebaseAuth,
    fireDb,
    increment,
    serverTimestamp,
} from "lib/firebase"
import { useState } from "react"
import { ApplicationModal } from "components/dashboard/modals"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import VerifiedIcon from "@mui/icons-material/Verified"
import PlusIcon from "icons/Plus"
import PrintIcon from "@mui/icons-material/Print"
import { useConfirmation } from "contexts/ConfirmContext/ConfirmationServiceContext"
import EditIcon from "@mui/icons-material/Edit"
import { HealthNoteModal } from "components/dashboard/modals"
import { useGetCustomerNotes } from "lib/useNotes"

const initialState = {
    note: "",
}
interface NoteProps {
    note: string
    noteId?: string
}
const HealthPolicyView = ({ policy, customer, ...props }) => {
    const user = firebaseAuth.currentUser
    const [open, setOpen] = useState(false)
    const [customerNotes, setCustomerNotes] = useState<NoteProps>(initialState)
    const [openNote, setOpenNote] = useState(false)
    const [moreAnchorEl, setMoreAnchorEl] = useState(null)
    const openMoreMenu = Boolean(moreAnchorEl)
    const { id } = useParams()
    const { notes } = useGetCustomerNotes(id)
    const navigate = useNavigate()
    const confirm = useConfirmation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!customerNotes.noteId) {
            try {
                await fireDb
                    .collection("customers")
                    .doc(id)
                    .collection("notes")
                    .add({
                        ...customerNotes,
                        createdAt: serverTimestamp(),
                        user: user.displayName,
                        noteFrom: "Health Policy Note",
                        customerId: id,
                        holderFirstName: customer.holderFirstName,
                        holderLastName: customer.holderLastName,
                    })
                await fireDb.collection("customers").doc(id).update({
                    notes: increment,
                    merge: true,
                })
            } catch (err) {
                console.error(err)
            }
        } else {
            try {
                await fireDb
                    .collection("customers")
                    .doc(id)
                    .collection("notes")
                    .doc(customerNotes.noteId)
                    .update({
                        ...customerNotes,
                        user: user.displayName,
                        noteFrom: "Health Policy Note",
                        customerId: id,
                        holderFirstName: customer.holderFirstName,
                        holderLastName: customer.holderLastName,
                        merge: true,
                    })
            } catch (err) {
                console.error(err)
            }
        }
        setCustomerNotes({ note: "" })
        setOpenNote(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setCustomerNotes({
            ...customerNotes,
            [name]: value,
        })
    }
    const hasHealthNote = notes.filter((x) => {
        return x.noteFrom === "Health Policy Note"
    })
    const useConfirm = () => {
        confirm({
            catchOnCancel: true,
            title: "Are you sure?",
            description: "This action cannot be undone.",
        })
            .then(() => onDelete())
            .catch(() => null)
    }
    const handleClick = (event) => {
        setMoreAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setMoreAnchorEl(null)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = (): void => {
        setOpen(false)
    }
    const onDelete = async () => {
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("policies")
            .doc(policy.policyId)
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
                    customer.holderFirstName + " " + customer.holderLastName,
                action: policy.policyType + " Policy Deleted",
                type: "Policy",
            })
        await fireDb
            .collection("customers")
            .doc(id)
            .update({
                merge: true,
                hasHealth: false,
            })
            .then(() => {
                toast.success("Policy Deleted")
            })
            .catch((error) => {
                toast.error("Something went wrong")
                console.error(error)
            })
    }
    const clearNote = async (n) => {
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("notes")
            .doc(n.noteId)
            .delete()
        await fireDb
            .collection("customers")
            .doc(id)
            .update({
                notes: decrement,
                merge: true,
            })
            .then(() => {
                toast.success("Note Deleted")
            })
            .catch((err) => console.error(err))
    }
    const handleActivation = async () => {
        if (policy.isActive === true) {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("policies")
                .doc(policy.policyId)
                .update({
                    isActive: false,
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
                    action: policy.policyType + " Policy Deactivated",
                    policyId: policy.policyId,
                    type: "Policy",
                })
            await fireDb
                .collection("customers")
                .doc(id)
                .update({
                    merge: true,
                    hasHealth: false,
                })
                .then(() => {
                    toast.success("Policy Deactivated")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })
        } else {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("policies")
                .doc(policy.policyId)
                .update({
                    isActive: true,
                    merge: true,
                })
            await fireDb.collection("customers").doc(id).update({
                merge: true,
                hasHealth: true,
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
                    action: policy.policyType + " Policy Activated",
                    policyId: policy.policyId,
                    type: "Policy",
                })
                .then(() => {
                    toast.success("Policy Activated")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })
        }
    }
    const handleVerification = async () => {
        if (policy.isVerified === false) {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("policies")
                .doc(policy.policyId)
                .update({
                    isVerified: true,
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
                    action: policy.policyType + " Policy Switched to Verified",
                    policyId: policy.policyId,
                    type: "Policy",
                })
                .then(() => {
                    toast.success("Policy Verified")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })
        } else {
            await fireDb
                .collection("customers")
                .doc(id)
                .collection("policies")
                .doc(policy.policyId)
                .update({
                    isVerified: false,
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
                        policy.policyType + " Policy Switched to Unverified",
                    policyId: policy.policyId,
                    type: "Policy",
                })
                .then(() => {
                    toast.success("Policy Unverified")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })
        }
    }

    const handleNote = (n) => {
        setCustomerNotes({
            note: n.note,
            noteId: n.noteId,
        })
        setOpenNote(true)
    }

    return (
        <>
            {policy ? (
                <Card {...props}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            pl: 2,
                            pt: 2,
                            pr: 2,
                            pb: 1.5,
                        }}
                    >
                        <Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography variant="h6">
                                    Health Insurance Policy
                                </Typography>
                                {policy.isVerified === true ? (
                                    <VerifiedIcon
                                        sx={{
                                            ml: 1,
                                            mr: 0.1,
                                        }}
                                        fontSize="small"
                                        color={"success"}
                                    />
                                ) : (
                                    <VerifiedIcon
                                        sx={{
                                            ml: 1,
                                            mr: 0.1,
                                        }}
                                        fontSize="small"
                                        color={"error"}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "30px",
                            }}
                        >
                            <Box
                                sx={{
                                    ml: "auto",
                                    mr: 2,
                                    width: "28px",
                                    mt: -1,
                                }}
                            >
                                <IconButton
                                    aria-label="More Options"
                                    id="more-options"
                                    aria-controls="more-options"
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openMoreMenu ? "true" : undefined
                                    }
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>
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
                                <MenuItem onClick={handleVerification}>
                                    {policy.isVerified === true ? (
                                        <>
                                            <VerifiedIcon
                                                color="error"
                                                sx={{ marginRight: 1.5 }}
                                            />{" "}
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: ".85rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Change to unverified
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <VerifiedIcon
                                                color="success"
                                                sx={{ marginRight: 1.5 }}
                                            />{" "}
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: ".85rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Change to verified
                                            </Typography>
                                        </>
                                    )}
                                </MenuItem>
                                <MenuItem onClick={handleActivation}>
                                    {policy.isActive === true ? (
                                        <>
                                            <CancelIcon
                                                color="primary"
                                                sx={{ marginRight: 1.5 }}
                                            />{" "}
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: ".85rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Change to inactive
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleIcon
                                                color="primary"
                                                sx={{ marginRight: 1.5 }}
                                            />{" "}
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: ".85rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Change to active
                                            </Typography>
                                        </>
                                    )}
                                </MenuItem>
                                <MenuItem
                                    disabled={
                                        policy.isActive === true ? true : false
                                    }
                                >
                                    <CloudUploadIcon
                                        color="primary"
                                        sx={{ marginRight: 1.5 }}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            fontSize: ".85rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Archive
                                    </Typography>
                                </MenuItem>
                                <Divider />
                                <Typography
                                    color="textPrimary"
                                    pl={2}
                                    py={1}
                                    sx={{
                                        fontSize: ".85rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    Send Email
                                </Typography>
                                <MenuItem
                                    disabled={
                                        customer.holderEmail.length < 1
                                            ? true
                                            : false
                                    }
                                >
                                    <CloudUploadIcon
                                        color="primary"
                                        sx={{ marginRight: 1.5 }}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            fontSize: ".85rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Rewards Partial
                                    </Typography>
                                </MenuItem>
                            </StyledMenu>
                        </Box>
                    </Box>
                    <Divider />
                    <Table>
                        <TableBody>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Carrier
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyCarrier || "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Plan
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyPlan || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Applied
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyApplicationDate || "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Effective
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyEffectiveDate || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Subscriber ID:
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyNumber || "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Application No.
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyApplicationNumber || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Subscribers
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policySubscribers || "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Deductible
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {"$"}
                                        {policy.policyDeductible || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Monthly Premium
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {"$"}{" "}
                                        {policy.policyMonthlyPremium || "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Subsidy
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {"$"}{" "}
                                        {policy.policySubsidyAmount || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Total Premium
                                    </Typography>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        {"$"}{" "}
                                        {policy.policyTotalMonthlyPremium ||
                                            "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Rewards
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.rewards || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <Typography
                                            color="textPrimary"
                                            variant="subtitle2"
                                        >
                                            Notes:
                                        </Typography>

                                        {hasHealthNote.length > 0 ? (
                                            <>
                                                {hasHealthNote.map((n, i) => (
                                                    <Box key={i}>
                                                        <IconButton
                                                            sx={{
                                                                ml: 1,
                                                                mt: -0.5,
                                                            }}
                                                            aria-label="expand row"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() =>
                                                                handleNote(n)
                                                            }
                                                        >
                                                            <EditIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "1rem",
                                                                }}
                                                            />
                                                        </IconButton>{" "}
                                                        <IconButton
                                                            sx={{
                                                                ml: 1,
                                                                mt: -0.5,
                                                            }}
                                                            aria-label="expand row"
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                clearNote(n)
                                                            }
                                                        >
                                                            <TrashIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "1rem",
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Box>
                                                ))}
                                            </>
                                        ) : (
                                            <IconButton
                                                sx={{ ml: 1, mt: -0.5 }}
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() =>
                                                    setOpenNote(true)
                                                }
                                            >
                                                <PlusIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Box>
                                    <Box sx={{ minHeight: "61px", mt: 1 }}>
                                        {hasHealthNote.map((n, i) => (
                                            <Typography
                                                color="textSecondary"
                                                variant="subtitle2"
                                                key={i}
                                            >
                                                {n.note}
                                            </Typography>
                                        ))}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <BottomNavigation showLabels>
                        <BottomNavigationAction
                            className="bottom-nav"
                            label="Edit"
                            icon={
                                <PencilAltIcon
                                    color="primary"
                                    fontSize="small"
                                />
                            }
                            onClick={() =>
                                navigate(
                                    `/dashboard/customers/${id}/health-policy-edit/${policy.policyId}`
                                )
                            }
                        />
                        <BottomNavigationAction
                            className="bottom-nav"
                            label="Delete"
                            icon={<TrashIcon color="error" fontSize="small" />}
                            onClick={useConfirm}
                        />
                        <BottomNavigationAction
                            className="bottom-nav"
                            label="App"
                            icon={
                                <PrintIcon color="primary" fontSize="small" />
                            }
                            onClick={handleOpen}
                        />
                    </BottomNavigation>
                </Card>
            ) : null}
            <HealthNoteModal
                open={openNote}
                onClose={() => setOpenNote(false)}
                id={id}
                customer={customer}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                customerNotes={customerNotes}
            />
            <ApplicationModal
                onClose={handleClose}
                open={open}
                policy={policy}
                notes={notes}
            />
        </>
    )
}

export default HealthPolicyView
