import { FC, useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { LifeForm } from "../FormSections"
import SaveIcon from "icons/Save"
import { formatDate } from "lib/formatDate"
import StringToBoolean from "lib/StringToBoolean"

interface EditLifePolicyProps {
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

const EditLifePolicy: FC<EditLifePolicyProps> = ({ customer }) => {
    const [policy, setPolicy] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { isVerified } = policy
    const { id, policyId } = useParams()

    const formattedPolicyAppDate = formatDate(policy.policyApplicationDate)
    const formattedEffectiveDate = formatDate(policy.policyEffectiveDate)
    const householdIncome = +customer.holderIncome + +customer.spouseIncome

    const verified = StringToBoolean(isVerified)
    const getData = useCallback(async () => {
        try {
            const docRef = await fireDb
                .collection(`customers/${id}/policies`)
                .doc(policyId)
            docRef.get().then((doc) => {
                if (doc.exists) {
                    //@ts-ignore
                    setPolicy(doc.data())
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, [policyId, id])

    useEffect(() => {
        getData()
    }, [getData])

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
            .doc(policyId)
            .update({
                ...policy,
                updatedAt: serverTimestamp(),
                merge: true,

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
                isVerified: verified,
            })
        await fireDb
            .collection("customers")
            .doc(id)
            .update({
                isCustomer: true,
                isProspect: false,
                merge: true,
            })
            .then(() => {
                toast.success("Life Policy Updated")
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

export default EditLifePolicy
