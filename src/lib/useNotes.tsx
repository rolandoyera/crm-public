import { useState, useEffect } from "react"
import { fireDb } from "./firebase"
import useMounted from "hooks/useMounted"

export const useGetCustomerNotes = (id) => {
    const mounted = useMounted()
    const [isNotesLoading, setIsNotesLoading] = useState(true)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        setIsNotesLoading(true)
        const unsubscribe = fireDb
            .collection("customers")
            .doc(id)
            .collection("notes")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), noteId: doc.id })
                })
                if (mounted.current) {
                    setNotes(documents)
                    setIsNotesLoading(false)
                }
            })
        return () => unsubscribe()
    }, [id, mounted])
    return { notes, isNotesLoading }
}
