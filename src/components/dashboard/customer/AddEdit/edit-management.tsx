import { FC, useCallback } from "react"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { firebaseAuth, fireDb, serverTimestamp } from "lib/firebase"
import { initialState } from "../helpers"
import { ManagementForm } from "../FormSections"
import type { CustomerDetailsProps } from "types/customer"

const EditManagement: FC = () => {
    const [customer, setCustomer] = useState<CustomerDetailsProps>(initialState)
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const user = firebaseAuth.currentUser
    const navigate = useNavigate()
    const { id } = useParams()
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
        setCustomer({
            ...customer,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        SetIsSubmitting(true)
        e.preventDefault()

        await fireDb
            .collection("customers")
            .doc(id)
            .update({
                ...customer,
                merge: true,
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

            <ManagementForm
                handleChange={handleChange}
                customer={customer}
                id={id}
                isSubmitting={isSubmitting}
            />
        </form>
    )
}

export default EditManagement
