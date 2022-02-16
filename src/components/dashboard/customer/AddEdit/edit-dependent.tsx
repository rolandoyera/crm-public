import { FC, useCallback, useEffect } from "react"
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
interface DependentProps {
    customer: {
        holderFirstName: string
        holderLastName: string
    }
}

const EditDependent: FC<DependentProps> = ({ customer }) => {
    const user = firebaseAuth.currentUser
    const [dependent, setDependent] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { id, dependentId } = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target
        setDependent({ ...dependent, [name]: value })
    }

    const getData = useCallback(async () => {
        try {
            const docRef = await fireDb
                .collection("customers")
                .doc(id)
                .collection("dependents")
                .doc(dependentId)
            docRef.get().then((doc) => {
                if (doc.exists) {
                    //@ts-ignore
                    setDependent(doc.data())
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, [dependentId, id])

    useEffect(() => {
        getData()
    }, [getData])

    const handleSubmit = async (e) => {
        SetIsSubmitting(true)
        e.preventDefault()
        await fireDb
            .collection("customers")
            .doc(id)
            .collection("dependents")
            .doc(dependentId)
            .update({
                ...dependent,
                merge: true,
                user: user.displayName,
                updatedAt: serverTimestamp(),
                customerId: id,
                customerName:
                    customer.holderFirstName + " " + customer.holderLastName,
                dependentDOB: formatDate(dependent.dependentDOB),
                dependentSSN: normalizeInput(dependent.dependentSSN),
            })
            .then(() => {
                toast.success("Dependent Updated")
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

export default EditDependent
