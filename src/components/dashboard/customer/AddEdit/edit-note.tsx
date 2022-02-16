import { FC, useCallback } from "react"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { FormNotes } from "../FormSections"
import SaveIcon from "icons/Save"

const initialState = {
    isVerified: null,
    isActive: "",
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
    policyType: "",
}

const EditNote: FC = () => {
    const [policy, setPolicy] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { id, policyId } = useParams()

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
            })
            .then(() => {
                toast.success("Notes Updated")
            })
            .catch((err) => {
                toast.error("Something went wrong. Please try again.")
                console.log(err)
            })
        navigate(-1)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" value="autoComplete off bug" />
            <Card sx={{ mt: 3, p: 3 }}>
                <FormNotes handleChange={handleChange} policy={policy} />
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

export default EditNote
