import { FC } from "react"
import toast from "react-hot-toast"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { LifeForm } from "../FormSections"
import SaveIcon from "icons/Save"
import { formatDate } from "lib/formatDate"

interface AddLifePolicyProps {
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
    isActive: null,
    policyApplicationNumber: "",
    policyApplicationDate: "",
    policyBeneficiaries: 0,
    policyCarrier: "",
    policyCoverageAmount: 0,
    policyEffectiveDate: "",
    policyTotalMonthlyPremium: null,
    policyNumber: "",
    policyPlan: "",
    policyType: "Life",
}

const AddLifePolicy: FC<AddLifePolicyProps> = ({ customer }) => {
    const user = firebaseAuth.currentUser
    const { id } = useParams()
    const navigate = useNavigate()
    const [policy, setPolicy] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const formattedPolicyAppDate = formatDate(policy.policyApplicationDate)
    const formattedEffectiveDate = formatDate(policy.policyEffectiveDate)
    const householdIncome = +customer.holderIncome + +customer.spouseIncome
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
                householdIncome: householdIncome || "No Entry",
                holderFirstName: customer.holderFirstName,
                holderLastName: customer.holderLastName,
                holderTobacco: customer.holderTobacco || "No Entry",
                policyNote: null,
                spouse: customer.spouse || "No Entry",
                policyApplicationDate: formattedPolicyAppDate,
                policyEffectiveDate: formattedEffectiveDate,
                policyTotalMonthlyPremium: Number(
                    policy.policyTotalMonthlyPremium
                ),
                policyType: "Life",
                isVerified: false,
                isActive: true,

                isArchived: false,
            })
        await fireDb.collection("customers").doc(id).update({
            isCustomer: true,
            isProspect: false,
            merge: true,
            hasLife: true,
        })
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("events")
            .add({
                user: user.displayName,
                createdAt: serverTimestamp(),
                customerId: id,
                holderFirstName: customer.holderFirstName,
                holderLastName: customer.holderLastName,
                action: policy.policyType + " Policy Added",
                type: "Policy",
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
                <LifeForm handleChange={handleChange} policy={policy} />
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

export default AddLifePolicy
