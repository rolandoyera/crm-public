import toast from "react-hot-toast"
import { Grid } from "@mui/material"
import { useParams } from "react-router-dom"
import { TouchModal, EmailModal, CallModal } from "components/dashboard/modals"
import { useState } from "react"
import { useGetTouchPointsByCustomerId } from "lib/useTouchPoints"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import TouchPoints from "./TouchPoints"
import Snapshot from "./Snapshot"
import Notes from "./Notes"
import { Tasks } from "./Tasks"
import { PolicySnapshot } from "./PolicySnaphot"

const Overview = ({ customer, policies, setCurrentTab, isPoliciesLoading }) => {
    const user = firebaseAuth.currentUser
    const { id } = useParams()
    const { touches } = useGetTouchPointsByCustomerId(id)
    const [open, setOpen] = useState(false)
    const [openCall, setOpenCall] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)

    const handleConversion = async () => {
        if (customer.isCustomer === false) {
            await fireDb
                .collection("customers")
                .doc(id)
                .update({
                    isCustomer: true,
                    isProspect: false,
                    merge: true,
                })
                .then(async () => {
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
                            action: "Converted To Client",
                            type: "Customer",
                        })
                        .catch((err) => {
                            toast.error(
                                "Something went wrong. Please try again."
                            )
                            console.log(err)
                        })
                })
                .then(() => {
                    toast.success("Converted To Client")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })

            window.location.reload()
        } else {
            await fireDb
                .collection("customers")
                .doc(id)
                .update({
                    isCustomer: false,
                    isProspect: true,
                    merge: true,
                })
                .then(async () => {
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
                            action: "Changed To Prospect",
                            type: "Customer",
                        })
                        .catch((err) => {
                            toast.error(
                                "Something went wrong. Please try again."
                            )
                            console.log(err)
                        })
                })
                .then(() => {
                    toast.success("Reverted To Prospect")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })

            window.location.reload()
        }
    }
    const handleIsLost = async () => {
        if (customer.isLost === false) {
            await fireDb
                .collection("customers")
                .doc(id)
                .update({
                    merge: true,
                    isLost: true,
                })
                .then(async () => {
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
                                customer.isProspect === true
                                    ? "Prospect Marked As Lost"
                                    : "Client Marked As Lost",
                            type: "Customer Lost",
                        })
                        .catch((err) => {
                            toast.error(
                                "Something went wrong. Please try again."
                            )
                            console.log(err)
                        })
                })
                .then(() => {
                    toast.success("Marked Lost")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })

            window.location.reload()
        } else {
            await fireDb
                .collection("customers")
                .doc(id)
                .update({
                    merge: true,
                    isLost: false,
                })
                .then(async () => {
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
                                customer.isProspect === true
                                    ? "Prospect Marked As Active"
                                    : "Client Marked As Active",
                            type: "Customer",
                        })
                        .catch((err) => {
                            toast.error(
                                "Something went wrong. Please try again."
                            )
                            console.log(err)
                        })
                })
                .then(() => {
                    toast.success("Marked Active")
                    setMoreAnchorEl(false)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                    console.error(error)
                })

            window.location.reload()
        }
    }
    const [moreAnchorEl, setMoreAnchorEl] = useState(null)
    const openMoreMenu = Boolean(moreAnchorEl)
    const handleCloseMenu = () => {
        setMoreAnchorEl(null)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = (): void => {
        setOpen(false)
    }
    const handleOpenCall = () => {
        setOpenCall(true)
    }
    const handleCloseCall = (): void => {
        setOpenCall(false)
    }
    const handleOpenEmail = () => {
        setOpenEmail(true)
    }
    const handleCloseEmail = (): void => {
        setOpenEmail(false)
    }
    const handleOpenMenu = (event) => {
        setMoreAnchorEl(event.currentTarget)
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Snapshot
                        handleOpenMenu={handleOpenMenu}
                        customer={customer}
                        openMoreMenu={openMoreMenu}
                        handleCloseMenu={handleCloseMenu}
                        moreAnchorEl={moreAnchorEl}
                        handleConversion={handleConversion}
                        handleOpenCall={handleOpenCall}
                        handleOpenEmail={handleOpenEmail}
                        handleIsLost={handleIsLost}
                        policies={policies}
                        touches={touches}
                        id={id}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TouchPoints
                        handleOpen={handleOpen}
                        touches={touches}
                        customer={customer}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <PolicySnapshot
                        isPoliciesLoading={isPoliciesLoading}
                        customer={customer}
                        policies={policies}
                        setCurrentTab={setCurrentTab}
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <Notes id={id} />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <Tasks customer={customer} />
                </Grid>
            </Grid>
            <TouchModal customer={customer} onClose={handleClose} open={open} />
            <CallModal
                onClose={handleCloseCall}
                openCall={openCall}
                customer={customer}
            />
            <EmailModal
                onClose={handleCloseEmail}
                openEmail={openEmail}
                customer={customer}
            />
        </>
    )
}

export default Overview
