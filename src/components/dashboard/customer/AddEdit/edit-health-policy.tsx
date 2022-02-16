import { FC, useCallback } from "react"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { HealthForm } from "../FormSections"
import SaveIcon from "icons/Save"
import { useGetCustomerById } from "lib/useFirestore"
import { formatDate } from "lib/formatDate"
import StringToBoolean from "lib/StringToBoolean"
import numberToFixed from "lib/numberToFixed"
import { Policy } from "types/policy"

const initialState: Policy = {
    isVerified: null,
    policyApplicationNumber: "",
    policyApplicationDate: "",
    policyCarrier: "",
    policyDeductible: 0,
    policyEffectiveDate: "",
    policyMonthlyPremium: null,
    policyNumber: "",
    policyPlan: "",
    policySubscribers: 0,
    policySubsidyAmount: null,
    policyTotalMonthlyPremium: 0,
    policyType: "",
}

const EditHealthPolicy: FC = () => {
    const [policy, setPolicy] = useState<Policy>(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { policyMonthlyPremium, policySubsidyAmount, isVerified } = policy
    const { id, policyId } = useParams()
    const { customer } = useGetCustomerById(id) as any
    const mp = policyMonthlyPremium - policySubsidyAmount
    const fixedAmount = numberToFixed(mp)
    const householdIncome = +customer.holderIncome + +customer.spouseIncome
    const formattedPolicyAppDate = formatDate(policy.policyApplicationDate)
    const formattedEffectiveDate = formatDate(policy.policyEffectiveDate)

    const verified = StringToBoolean(isVerified)

    const parsedDate = Date.parse(formattedPolicyAppDate)

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

        //Update Policy Doc
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("policies")
            .doc(policyId)
            .update({
                ...policy,
                updatedAt: serverTimestamp(),
                merge: true,

                holderFirstName: customer.holderFirstName,
                holderLastName: customer.holderLastName,

                holderTobacco: customer.holderTobacco || "No Entry",
                spouse: customer.spouse || "No Entry",
                policyTotalMonthlyPremium: fixedAmount,
                householdIncome: householdIncome,
                policyAppDateParsed: parsedDate,
                policyApplicationDate: formattedPolicyAppDate,
                policyEffectiveDate: formattedEffectiveDate,

                isVerified: verified,
            })
            .then(() => {
                //Update Customer Doc

                fireDb.collection("customers").doc(id).update({
                    policyCarrier: policy.policyCarrier,
                    isCustomer: true,
                    isProspect: false,
                })
            })
            .then(() => {
                toast.success("Health Policy Updated")
            })
            .catch((err) => {
                toast.error("Submition error. Try again.")
                console.log(err)
            })
            .finally(() => {
                SetIsSubmitting(false)
            })
        navigate(-1)
    }

    return (
        <form onSubmit={handleSubmit}>
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

export default EditHealthPolicy
