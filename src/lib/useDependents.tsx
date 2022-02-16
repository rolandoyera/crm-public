import { useState, useEffect } from "react"
import { fireDb } from "./firebase"
import useMounted from "hooks/useMounted"

export const useGetDependents = (id) => {
    const mounted = useMounted()
    const [dependents, setDependents] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .doc(id)
            .collection("dependents")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), dependentId: doc.id })
                })
                if (mounted.current) {
                    setDependents(documents)
                }
            })
        return () => unsubscribe()
    }, [id, mounted])
    return { dependents }
}
