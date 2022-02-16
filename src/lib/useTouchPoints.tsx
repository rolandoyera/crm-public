import { useState, useEffect } from "react"
import { fireDb } from "./firebase"
import useMounted from "hooks/useMounted"

export const useGetTouchPointsByCustomerId = (id) => {
    const mounted = useMounted()
    const [touches, setTouch] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .doc(id)
            .collection("touches")
            .orderBy("createdAt", "desc")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), touchId: doc.id })
                })
                if (mounted.current) {
                    setTouch(documents)
                }
            })
        return () => unsubscribe()
    }, [id, mounted])
    return { touches }
}
export const useGetRecentTouchPoints = () => {
    const mounted = useMounted()
    const [touches, setTouch] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("touches")
            .orderBy("createdAt", "desc")
            .limit(10)
            .onSnapshot((snap) => {
                const setDocuments = []
                snap.forEach((doc) => {
                    setDocuments.push({ ...doc.data(), touchId: doc.id })
                })
                if (mounted.current) {
                    setTouch(setDocuments)
                }
            })
        return () => unsubscribe()
    }, [mounted])
    return { touches }
}
