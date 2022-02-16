import { FC } from "react"
import toast from "react-hot-toast"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { BeneficiaryForm } from "../FormSections"
import SaveIcon from "icons/Save"
import { formatPhoneNumber, normalizeInput } from "../helpers"
import { formatDate } from "lib/formatDate"

const initialState = {
    beneficiaryFirstName: "",
    beneficiaryMiddleName: "",
    beneficiaryLastName: "",
    beneficiaryDOB: "",
    beneficiarySSN: "",
    beneficiaryRelation: "",
    beneficiaryPhoneNumber: "",
    beneficiaryEmail: "",
    beneficiaryPercentage: 0,
}

const AddBeneficiary: FC = ({ customer }: any) => {
    const user = firebaseAuth.currentUser
    const [beneficiary, setBeneficiary] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const formattedBeneficiaryPhone = formatPhoneNumber(
        beneficiary.beneficiaryPhoneNumber
    )
    const handleChange = (e) => {
        const { name, value } = e.target
        setBeneficiary({ ...beneficiary, [name]: value })
    }

    const handleSubmit = async (e) => {
        SetIsSubmitting(true)
        e.preventDefault()
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("beneficiaries")
            .add({
                ...beneficiary,
                user: user.displayName,
                createdAt: serverTimestamp(),
                customerId: id,
                customerName:
                    customer.holderFirstName + " " + customer.holderLastName,
                beneficiaryDOB: formatDate(beneficiary.beneficiaryDOB),
                beneficiarySSN: normalizeInput(beneficiary.beneficiarySSN),
                beneficiaryPhoneNumber: formattedBeneficiaryPhone,
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
                    customer.holderFirstName + " " + customer.holderLastName,
                action:
                    beneficiary.beneficiaryFirstName +
                    " " +
                    beneficiary.beneficiaryLastName +
                    " Added As Beneficiary",
                type: "Beneficiary",
            })
            .then(() => {
                toast.success("Beneficiary Added")
            })
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="new-password">
            <input type="hidden" value="autoComplete off bug" />
            <Card sx={{ mt: 3 }}>
                <Box sx={{ p: 3 }}>
                    <BeneficiaryForm
                        handleChange={handleChange}
                        beneficiary={beneficiary}
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

export default AddBeneficiary
