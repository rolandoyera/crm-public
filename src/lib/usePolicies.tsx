import { useState, useEffect } from "react"
import { fireDb } from "./firebase"
import useMounted from "hooks/useMounted"

export const useGetAllPoliciesByCurrentMonth = (collection) => {
    const mounted = useMounted()
    const [policies, setPolicies] = useState([])
    const d = new Date()
    const getCurrentMonth = d.getMonth() + 1
    const getCurrentYear = d.getFullYear()
    const getDaysInMonth = new Date(
        getCurrentYear,
        getCurrentMonth,
        0
    ).getDate()

    const startDate = 1
    const endDate = getDaysInMonth

    const startCurrentMonth =
        getCurrentMonth + "-" + startDate + "-" + getCurrentYear

    const endCurrentMonth =
        getCurrentMonth + "-" + endDate + "-" + getCurrentYear

    const startCurrentMonthParsed = Date.parse(startCurrentMonth)
    const endCurrentMonthParsed = Date.parse(endCurrentMonth)

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup(collection)
            .orderBy("policyAppDateParsed")
            .startAt(startCurrentMonthParsed)
            .endAt(endCurrentMonthParsed)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), policyId: doc.id })
                })
                if (mounted.current) {
                    setPolicies(documents)
                }
            })
        return () => unsubscribe()
    }, [mounted, collection, startCurrentMonthParsed, endCurrentMonthParsed])
    return { policies }
}

export const useHealthPoliciesCurrentMonth = () => {
    const mounted = useMounted()
    const [healthPolicies, setHealthPolicies] = useState([])
    const d = new Date()
    const getCurrentMonth = d.getMonth() + 1
    const getCurrentYear = d.getFullYear()
    const getDaysInMonth = new Date(
        getCurrentYear,
        getCurrentMonth,
        0
    ).getDate()

    const startDate = 1
    const endDate = getDaysInMonth

    const startCurrentMonth =
        getCurrentMonth + "-" + startDate + "-" + getCurrentYear

    const endCurrentMonth =
        getCurrentMonth + "-" + endDate + "-" + getCurrentYear

    const startCurrentMonthParsed = Date.parse(startCurrentMonth)
    const endCurrentMonthParsed = Date.parse(endCurrentMonth)

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("policies")
            .orderBy("policyAppDateParsed")
            .startAt(startCurrentMonthParsed)
            .endAt(endCurrentMonthParsed)
            .where("policyType", "==", "Health")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), policyId: doc.id })
                })
                if (mounted.current) {
                    setHealthPolicies(documents)
                }
            })
        return () => unsubscribe()
    }, [mounted, startCurrentMonthParsed, endCurrentMonthParsed])
    return { healthPolicies }
}

export const useGetAllPoliciesByCustomerId = (id) => {
    const mounted = useMounted()
    const [policies, setPolicies] = useState([])
    const [isPoliciesLoading, setIsPoliciesLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .doc(id)
            .collection("policies")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), policyId: doc.id })
                })
                if (mounted.current) {
                    setPolicies(documents)
                    setIsPoliciesLoading(false)
                }
            })

        return () => unsubscribe()
    }, [id, mounted])

    return { policies, isPoliciesLoading }
}

export const useGetPoliciesCreatedAtLimited = (limit) => {
    const mounted = useMounted()
    const [policies, setPolicies] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("policies")
            .orderBy("createdAt", "desc")
            .limit(limit)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                if (mounted.current) {
                    setPolicies(documents)
                }
            })
        return () => unsubscribe()
    }, [mounted, limit])
    return { policies }
}
