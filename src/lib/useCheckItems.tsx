import { useState, useEffect } from "react"
import { fireDb } from "./firebase"
import useMounted from "hooks/useMounted"

export const useGetCheckItems = (id) => {
    const mounted = useMounted()
    const [checkItems, setCheckItems] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .doc(id)
            .collection("checkItems")
            .orderBy("priority", "desc")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), checkItemId: doc.id })
                })
                if (mounted.current) {
                    setCheckItems(documents)
                }
                setCheckItems(documents)
            })
        return () => unsubscribe()
    }, [mounted, id])
    return { checkItems }
}
export const useGetAllCheckItems = () => {
    const [checkItems, setCheckItems] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("checkItems")
            .orderBy("priority", "desc")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), checkItemId: doc.id })
                })
                setCheckItems(documents)
            })
        return () => unsubscribe()
    }, [])
    return { checkItems }
}
