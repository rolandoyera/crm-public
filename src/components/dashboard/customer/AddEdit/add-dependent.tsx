import { FC } from "react"
import toast from "react-hot-toast"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { DependentForm } from "../FormSections"
import SaveIcon from "icons/Save"
import { normalizeInput } from "../helpers"
import { formatDate } from "lib/formatDate"

const initialState = {
    dependentFirstName: "",
    dependentMiddleName: "",
    dependentLastName: "",
    dependentDOB: "",
    dependentSSN: "",
    dependentCitizenship: "",
    dependentRelation: "",
}

const AddDependent: FC = ({ customer }: any) => {
    const user = firebaseAuth.currentUser
    const [dependent, setDependent] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target
        setDependent({ ...dependent, [name]: value })
    }

    const handleSubmit = async (e) => {
        SetIsSubmitting(true)
        e.preventDefault()
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("dependents")
            .add({
                ...dependent,
                user: user.displayName,
                createdAt: serverTimestamp(),
                customerId: id,
                customerName:
                    customer.holderFirstName + " " + customer.holderLastName,
                dependentDOB: formatDate(dependent.dependentDOB),
                dependentSSN: normalizeInput(dependent.dependentSSN),
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
                    dependent.dependentFirstName +
                    " " +
                    dependent.dependentLastName +
                    " Added As Dependent",
                type: "Dependent",
            })
            .then(() => {
                toast.success("Dependent Added")
            })
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="new-password">
            <input type="hidden" value="autoComplete off bug" />
            <Card sx={{ mt: 3 }}>
                <Box sx={{ p: 3 }}>
                    <DependentForm
                        handleChange={handleChange}
                        dependent={dependent}
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

export default AddDependent
