import { useState, useEffect } from "react"
import { fireDb } from "./firebase"
import useMounted from "hooks/useMounted"

export const useGetBeneficiaries = (id) => {
    const mounted = useMounted()
    const [beneficiaries, setBeneficiaries] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .doc(id)
            .collection("beneficiaries")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), beneficiaryId: doc.id })
                })
                if (mounted.current) {
                    setBeneficiaries(documents)
                }
            })
        return () => unsubscribe()
    }, [mounted, id])
    return { beneficiaries }
}
