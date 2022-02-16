import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"
import { decrement, firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { StyledMenu } from "./StyledMenu"
import PencilAltIcon from "icons/PencilAlt"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CancelIcon from "@mui/icons-material/Cancel"
import TrashIcon from "icons/Trash"
import { ApplicationModal } from "components/dashboard/ApplicationModal"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import VerifiedIcon from "@mui/icons-material/Verified"
import PlusIcon from "icons/Plus"
import PrintIcon from "@mui/icons-material/Print"
import { useConfirmation } from "contexts/ConfirmContext/ConfirmationServiceContext"
import formatCoverage from "lib/formatCoverage"
import EditIcon from "@mui/icons-material/Edit"

const LifePolicyView = ({ policy, customer, ...props }) => {
    const user = firebaseAuth.currentUser

    const [open, setOpen] = useState(false)
    const [moreAnchorEl, setMoreAnchorEl] = useState(null)
    const openMoreMenu = Boolean(moreAnchorEl)
    const { id } = useParams()
    const navigate = useNavigate()

    const formattedCoverage = formatCoverage(policy.policyCoverageAmount)
    const confirm = useConfirmation()
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
                hasLife: false,
            })
            .then(() => {
                toast.success("Policy Deleted")
            })
            .catch((error) => {
                toast.error("Something went wrong")
                console.error(error)
            })
    }
    const clearNote = async () => {
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("policies")
            .doc(policy.policyId)
            .update({
                policyNote: null,
                merge: true,
            })
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
                    hasLife: false,
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
            await fireDb
                .collection("customers")
                .doc(id)
                .update({
                    merge: true,
                    hasLife: true,
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
                                    Life Insurance Policy
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
                                        policy.isActive === "true"
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
                                        Archive
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
                                        Plan
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyPlan || "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Policy Type
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyType || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Application Date
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
                                        Carrier
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyCarrier || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Effective Date
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyEffectiveDate || "-"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Beneficiaries
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {policy.policyBeneficiaries || "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Policy Number
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
                                        Application Number
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
                                        Monthly Premium
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    ></Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        {"$"}{" "}
                                        {policy.policyTotalMonthlyPremium ||
                                            "-"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow className="form-table-row">
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        Coverage
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                    >
                                        {"$"} {formattedCoverage || "-"}
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
                                        {policy.policyNote === null ? (
                                            <IconButton
                                                sx={{ ml: 1, mt: -0.5 }}
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/customers/${id}/note-edit/${policy.policyId}`
                                                    )
                                                }
                                            >
                                                <PlusIcon fontSize="small" />
                                            </IconButton>
                                        ) : (
                                            <>
                                                <IconButton
                                                    sx={{ ml: 1, mt: -0.5 }}
                                                    aria-label="expand row"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/customers/${id}/note-edit/${policy.policyId}`
                                                        )
                                                    }
                                                >
                                                    <EditIcon
                                                        sx={{
                                                            fontSize: "1rem",
                                                        }}
                                                    />
                                                </IconButton>{" "}
                                                <IconButton
                                                    sx={{ ml: 1, mt: -0.5 }}
                                                    aria-label="expand row"
                                                    size="small"
                                                    color="error"
                                                    onClick={clearNote}
                                                >
                                                    <TrashIcon
                                                        sx={{
                                                            fontSize: "1rem",
                                                        }}
                                                    />
                                                </IconButton>
                                            </>
                                        )}
                                    </Box>
                                    <Box sx={{ minHeight: "61px" }}>
                                        <Typography
                                            mt={1}
                                            color="textPrimary"
                                            variant="subtitle2"
                                        >
                                            {policy.policyNote}
                                        </Typography>
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
                                    `/dashboard/customers/${id}/life-policy-edit/${policy.policyId}`
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

            <ApplicationModal
                onClose={handleClose}
                open={open}
                policy={policy}
            />
        </>
    )
}

export default LifePolicyView
