import toast from "react-hot-toast"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { Card } from "@mui/material"
import { formatPhoneNumber, initialState, normalizeInput } from "../helpers"
import { formatDate } from "lib/formatDate"
import { ManagementForm, ClientForm, SpouseForm } from "../FormSections"

const Add = () => {
    const [customer, setCustomer] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const user = firebaseAuth.currentUser
    const navigate = useNavigate()
    const { spouse, holderPhoneNumber, holderAltPhoneNumber } = customer
    const { id } = useParams()
    const formattedPhone = formatPhoneNumber(holderPhoneNumber)
    const formattedAltPhone = formatPhoneNumber(holderAltPhoneNumber)
    const householdIncome = +customer.holderIncome + +customer.spouseIncome
    const formattedDOB = formatDate(customer.holderDOB)
    const formattedSSN = normalizeInput(customer.holderSSN)
    const formattedSpouseSSN = normalizeInput(customer.spouseSSN)
    const formattedSpouseDOB = formatDate(customer.spouseDOB)
    const formattedSpousePhone = formatPhoneNumber(customer.spousePhoneNumber)
    const formattedSpouseAltPhone = formatPhoneNumber(
        customer.spouseAltPhoneNumber
    )
    console.log(user)

    const handleChange = (e) => {
        const { name, value } = e.target
        setCustomer({
            ...customer,
            [name]: value,
        })
    }
    const handleSubmit = async (e) => {
        SetIsSubmitting(true)
        e.preventDefault()
        await fireDb
            .collection("customers")
            .doc()
            .set({
                ...customer,
                updatedAt: "",
                createdAt: serverTimestamp(),
                unread: true,
                createdBy: user.displayName,
                hasHealth: false,
                hasLife: false,
                hasDental: false,
                hasVision: false,
                holderPhoneNumber: formattedPhone || null,
                holderAltPhoneNumber: formattedAltPhone || null,
                holderIncome: Number(customer.holderIncome),
                householdIncome: householdIncome || null,
                holderDependents: Number(customer.holderDependents),
                holderSSN: formattedSSN || null,
                holderDOB: formattedDOB || null,
                spouseAltPhoneNumber: formattedSpouseAltPhone || null,
                spouseDOB: formattedSpouseDOB || null,
                spouseIncome: Number(customer.spouseIncome),
                spousePhoneNumber: formattedSpousePhone || null,
                spouseSSN: formattedSpouseSSN || null,
                isLost: false,
                isProspect: true,
                isCustomer: false,
            })
            .then(() => {
                toast.success("Client Added")
            })
            .catch((err) => {
                toast.error("Something went wrong. Please try again.")
                console.log(err)
            })
        navigate(`/dashboard/customers`)
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="new-password">
            <input type="hidden" value="autoComplete off bug" />
            <Card sx={{ mt: 3, p: 3 }}>
                <ClientForm handleChange={handleChange} customer={customer} />
            </Card>
            {spouse === "Yes" ? (
                <Card sx={{ mt: 3, p: 3 }}>
                    <SpouseForm
                        handleChange={handleChange}
                        customer={customer}
                    />
                </Card>
            ) : null}

            <ManagementForm
                handleChange={handleChange}
                customer={customer}
                id={id}
                isSubmitting={isSubmitting}
            />
        </form>
    )
}

export default Add
