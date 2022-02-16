import { FC, useCallback } from "react"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { Box, Button, Card } from "@mui/material"
import { ClientForm, SpouseForm } from "../FormSections"
import SaveIcon from "icons/Save"
import { formatPhoneNumber, normalizeInput, initialState } from "../helpers"
import { formatDate } from "lib/formatDate"

const EditClient: FC = () => {
    const [customer, setCustomer] = useState(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const user = firebaseAuth.currentUser
    const navigate = useNavigate()
    const { id } = useParams()
    const { spouse } = customer
    const formattedPhone = formatPhoneNumber(customer.holderPhoneNumber)
    const formattedAltPhone = formatPhoneNumber(customer.holderAltPhoneNumber)
    const householdIncome = +customer.holderIncome + +customer.spouseIncome
    const formattedDOB = formatDate(customer.holderDOB)
    const formattedSSN = normalizeInput(customer.holderSSN)
    const formattedSpouseSSN = normalizeInput(customer.spouseSSN)
    const formattedSpouseDOB = formatDate(customer.spouseDOB)
    const formattedSpousePhone = formatPhoneNumber(customer.spousePhoneNumber)
    const formattedSpouseAltPhone = formatPhoneNumber(
        customer.spouseAltPhoneNumber
    )

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
        //eslint-disable-next-line
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
                holderPhoneNumber: formattedPhone || null,
                holderAltPhoneNumber: formattedAltPhone || null,
                householdIncome: householdIncome || null,
                holderSSN: formattedSSN || null,
                holderDOB: formattedDOB || null,
                holderIncome: Number(customer.holderIncome),
                merge: true,
                spouseAltPhoneNumber: formattedSpouseAltPhone || null,
                spouseDOB: formattedSpouseDOB || null,
                spouseIncome: Number(customer.spouseIncome),
                spousePhoneNumber: formattedSpousePhone || null,
                spouseSSN: formattedSpouseSSN || null,
                updatedAt: serverTimestamp(),
                updatedBy: user.displayName,
            })
            .then(() => {
                toast.success(
                    customer.isProspect === true
                        ? "Prospect Updated"
                        : "Client Updated"
                )
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
                <ClientForm handleChange={handleChange} customer={customer} />
                {spouse === "Yes" ? null : (
                    <Box sx={{ mt: 3 }}>
                        <Button
                            sx={{ px: 3, py: 1, mr: 2 }}
                            color="primary"
                            onClick={() => {
                                navigate(-1)
                            }}
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
                )}
            </Card>

            {spouse === "Yes" ? (
                <Card sx={{ mt: 3, p: 3 }}>
                    <SpouseForm
                        handleChange={handleChange}
                        customer={customer}
                    />
                    <Box sx={{ mt: 3 }}>
                        <Button
                            sx={{ px: 3, py: 1, mr: 2 }}
                            color="primary"
                            onClick={() =>
                                navigate(`/dashboard/customers/${id}`)
                            }
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
            ) : null}
        </form>
    )
}

export default EditClient
