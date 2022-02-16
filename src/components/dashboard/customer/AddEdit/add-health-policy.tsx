import { FC } from "react"
import toast from "react-hot-toast"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import SaveIcon from "icons/Save"
import { formatDate } from "lib/formatDate"
import { HealthForm } from "../FormSections"
import StringToBoolean from "lib/StringToBoolean"
import numberToFixed from "lib/numberToFixed"

interface AddHealthPolicyProps {
    customer: {
        holderFirstName: string
        holderLastName: string
        holderIncome: string
        holderTobacco: string
        spouseIncome: string
        spouse: string
    }
}

const initialState = {
    isVerified: null,
    isActive: null,
    policyApplicationNumber: "",
    policyApplicationDate: "",
    policyCarrier: "",
    policyEffectiveDate: "",
    policyMonthlyPremium: null,
    policyNumber: "",
    policyPlan: "",
    policySubscribers: 0,
    policySubsidyAmount: null,
    policyTotalMonthlyPremium: 0,
    policyType: "Health",
}

const AddHealthPolicy: FC<AddHealthPolicyProps> = ({ customer }) => {
    const user = firebaseAuth.currentUser
    const { id } = useParams()
    const navigate = useNavigate()

    const [policy, setPolicy] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const { policyMonthlyPremium, policySubsidyAmount, isVerified } = policy
    // Monthly Premium Calculation
    const mp = policyMonthlyPremium - policySubsidyAmount
    // Monthly Premium Parse Function
    const fixedAmount = numberToFixed(mp)
    // Household Income Calculation
    const householdIncome = +customer.holderIncome + +customer.spouseIncome
    // Date Format to mm-dd-yyyy
    const formattedPolicyAppDate = formatDate(policy.policyApplicationDate)
    const formattedEffectiveDate = formatDate(policy.policyEffectiveDate)
    const verified = StringToBoolean(isVerified)

    // Extra parsed date field added for analytics purposes
    const parsedDate = Date.parse(formattedPolicyAppDate)

    const handleChange = (e) => {
        const { name, value } = e.target
        setPolicy({
            ...policy,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        SetIsSubmitting(true)
        e.preventDefault()
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("policies")
            .add({
                ...policy,
                createdAt: serverTimestamp(),
                user: user.displayName,
                customerId: id,

                holderFirstName: customer.holderFirstName,
                holderLastName: customer.holderLastName,
                holderTobacco: customer.holderTobacco || "No Entry",
                spouse: customer.spouse || "No Entry",
                policyTotalMonthlyPremium: fixedAmount,
                householdIncome: householdIncome,
                policyAppDateParsed: parsedDate,
                policyApplicationDate: formattedPolicyAppDate,
                policyEffectiveDate: formattedEffectiveDate,
                policyNote: null,
                isActive: true,
                isVerified: verified,
                isArchived: false,
            })
            .then(() => {
                fireDb.collection("customers").doc(id).update({
                    isCustomer: true,
                    isProspect: false,
                    hasHealth: true,
                    policyCarrier: policy.policyCarrier,
                })
            })
            .then(() => {
                fireDb
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
                        action: policy.policyType + " Policy Added",
                        type: "Policy",
                    })
            })
            .then(() => {
                toast.success("Policy Added")
            })
            .catch((err) => {
                toast.error("Something went wrong. Please try again.")
                console.log(err)
            })
        navigate(-1)
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="new-password">
            <input type="hidden" value="autoComplete off bug" />
            <Card sx={{ mt: 3, p: 3 }}>
                <HealthForm handleChange={handleChange} policy={policy} />
                <Box sx={{ mt: 3 }}>
                    <Button
                        sx={{ px: 3, py: 1, mr: 2 }}
                        color="primary"
                        onClick={() => navigate(-1)}
                        variant="text"
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ py: 1 }}
                        color="primary"
                        disabled={isSubmitting}
                        startIcon={<SaveIcon fontSize="small" />}
                        type="submit"
                        variant="contained"
                    >
                        Save
                    </Button>
                </Box>
            </Card>
        </form>
    )
}

export default AddHealthPolicy
