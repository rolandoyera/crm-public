import { FC, useCallback } from "react"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { SpouseForm } from "../FormSections"
import SaveIcon from "icons/Save"
import { formatPhoneNumber, normalizeInput, initialState } from "../helpers"
import { formatDate } from "lib/formatDate"

const EditSpouse: FC = () => {
    const [customer, setCustomer] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const user = firebaseAuth.currentUser
    const navigate = useNavigate()
    const { id } = useParams()
    const formattedSpouseSSN = normalizeInput(customer.spouseSSN)
    const formattedSpouseDOB = formatDate(customer.spouseDOB)
    const formattedSpousePhone = formatPhoneNumber(customer.spousePhoneNumber)
    const formattedSpouseAltPhone = formatPhoneNumber(
        customer.spouseAltPhoneNumber
    )
    const householdIncome = +customer.holderIncome + +customer.spouseIncome

    const getData = useCallback(async () => {
        try {
            const docRef = await fireDb.collection("customers").doc(id)
            docRef.get().then((doc) => {
                if (doc.exists) {
                    //@ts-ignore
                    setCustomer(doc.data())
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

    const handleChange = (e) => {
        const { name, value } = e.target

        setCustomer({ ...customer, [name]: value })
    }

    const handleSubmit = async (e) => {
        SetIsSubmitting(true)
        e.preventDefault()
        await fireDb
            .collection("customers")
            .doc(id)
            .update({
                ...customer,
                spouse: "Yes",
                updatedAt: serverTimestamp(),
                updatedBy: user.displayName,
                merge: true,
                spouseDOB: formattedSpouseDOB,
                spousePhoneNumber: formattedSpousePhone,
                spouseSSN: formattedSpouseSSN,
                householdIncome: householdIncome,
                spouseAltPhoneNumber: formattedSpouseAltPhone,
            })
            .then(() => {
                toast.success("Spouse Updated")
            })
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="new-password">
            <input type="hidden" value="autoComplete off bug" />
            <Card sx={{ mt: 3 }}>
                <Box sx={{ p: 3 }}>
                    <SpouseForm
                        handleChange={handleChange}
                        customer={customer}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button
                            sx={{ px: 3, mr: 2 }}
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
                </Box>
            </Card>
        </form>
    )
}

export default EditSpouse
