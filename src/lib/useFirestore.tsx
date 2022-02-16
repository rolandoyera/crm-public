import { useState, useEffect } from "react"
import { fireDb } from "./firebase"
import useMounted from "hooks/useMounted"

export const useGetAllCustomers = (collection) => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collection(collection)
            .where("isLost", "==", false)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                setCustomers(documents)
            })
        return () => unsubscribe()
    }, [collection])
    return { customers }
}

export const useGetCustomersByDateLimited = (limit) => {
    const mounted = useMounted()
    const [customers, setCustomers] = useState([])
    const [isCustomersLoading, setIsCustomersLoading] = useState(true)
    const [customersHasError, setCustomersHasError] = useState("")

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("customers")
            .where("isLost", "==", false)
            .orderBy("createdAt", "desc")
            .limit(limit)
            .onSnapshot(
                (snap) => {
                    const documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setCustomers(documents)
                        setIsCustomersLoading(false)
                    }
                },
                (error) => {
                    setCustomersHasError("Database Error: Please Try Again.")
                }
            )
        return () => unsubscribe()
    }, [mounted, limit])

    return { customers, isCustomersLoading, customersHasError }
}

export const useGetCustomersByDate = () => {
    const mounted = useMounted()
    const [customers, setCustomers] = useState([])
    const [isCustomersLoading, setIsCustomersLoading] = useState(true)
    const [customersHasError, setCustomersHasError] = useState("")

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("customers")
            .limit(10)
            .onSnapshot(
                (snap) => {
                    const documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setCustomers(documents)
                        setIsCustomersLoading(false)
                    }
                },
                (error) => {
                    setCustomersHasError("Database Error: Please Try Again.")
                }
            )
        return () => unsubscribe()
    }, [mounted])

    return { customers, isCustomersLoading, customersHasError }
}

export const useGetCustomerById = (id) => {
    const mounted = useMounted()
    const [customer, setCustomer] = useState({}) as any
    const [isCustomerLoading, setIsCustomerLoading] = useState(true)
    const [customerHasError, setCustomerHasError] = useState("")

    useEffect(() => {
        fireDb
            .collection("customers")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists && mounted.current) {
                    setCustomer(doc.data())
                    setIsCustomerLoading(false)
                }
            })
            .catch((error) => {
                console.error(error)
                setCustomerHasError("Error Loading Customer. Try Again.")
            })
    }, [id, mounted])
    return { customer, customerHasError, isCustomerLoading }
}
export const useGetCustomersByUnread = () => {
    const mounted = useMounted()
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("customers")
            .orderBy("createdAt", "desc")
            .where("unread", "==", true)
            .limit(10)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                if (mounted.current) {
                    setCustomers(documents)
                }
            })
        return () => unsubscribe()
    }, [mounted])
    return { customers }
}
export const useGetActiveClients = () => {
    const mounted = useMounted()
    const [clients, setClients] = useState([])
    const [clientsHasError, setClientsHasError] = useState("")

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .where("isCustomer", "==", true)
            .where("isLost", "==", false)
            .limit(10)
            .onSnapshot(
                (snap) => {
                    const documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setClients(documents)
                    }
                },
                (error) => {
                    setClientsHasError("Database Error: Please Try Again.")
                }
            )
        return () => unsubscribe()
    }, [mounted])
    return { clients, clientsHasError }
}

export const useGetActiveClientsLimited = (limit) => {
    const mounted = useMounted()
    const [clients, setClients] = useState([])
    const [clientsHasError, setClientsHasError] = useState("")

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .where("isCustomer", "==", true)
            .where("isLost", "==", false)
            .limit(limit)
            .onSnapshot(
                (snap) => {
                    const documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setClients(documents)
                    }
                },
                (error) => {
                    setClientsHasError("Database Error: Please Try Again.")
                }
            )
        return () => unsubscribe()
    }, [mounted, limit])
    return { clients, clientsHasError }
}

export const useGetActiveProspects = () => {
    const mounted = useMounted()
    const [prospects, setProspects] = useState([])
    const [prospectsHasError, setProspectsHasError] = useState("")

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .where("isProspect", "==", true)
            .where("isLost", "==", false)
            .orderBy("createdAt", "desc")
            .limit(5)
            .onSnapshot(
                (snap) => {
                    const documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setProspects(documents)
                    }
                },
                (error) => {
                    setProspectsHasError("Database Error: Please Try Again.")
                }
            )
        return () => unsubscribe()
    }, [mounted])
    return { prospects, prospectsHasError }
}
export const useGetAllPolicies = (collection) => {
    const [policies, setPolicies] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup(collection)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), policyId: doc.id })
                })
                setPolicies(documents)
            })
        return () => unsubscribe()
    }, [collection])
    return { policies }
}

export const useGetLostByDate = (collection) => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup(collection)
            .where("isLost", "==", true)
            .orderBy("createdAt", "desc")
            .limit(50)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                setCustomers(documents)
            })
        return () => unsubscribe()
    }, [collection])
    return { customers }
}

export const useGetAllTouchPoints = () => {
    const mounted = useMounted()
    const [touch, setTouch] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("touches")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                })
                if (mounted.current) {
                    setTouch(documents)
                }
            })
        return () => unsubscribe()
    }, [mounted])
    return { touch }
}
export const useGetPoliciesCreatedAt = () => {
    const mounted = useMounted()
    const [policies, setPolicies] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("policies")
            .orderBy("createdAt", "desc")
            .limit(10)
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
    }, [mounted])
    return { policies }
}
export const useGetPolicyLengthByCarrier = (
    collection,
    carrierName,
    carrier,
    setStateName
) => {
    const mounted = useMounted()
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
            .where("policyCarrier", "==", carrierName)
            .orderBy("policyAppDateParsed")
            .startAt(startCurrentMonthParsed)
            .endAt(endCurrentMonthParsed)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                if (mounted.current) {
                    setStateName(documents)
                }
            })
        return () => unsubscribe()
    }, [
        mounted,
        collection,
        carrierName,
        setStateName,
        startCurrentMonthParsed,
        endCurrentMonthParsed,
    ])
    return { carrier }
}
export const useGetPolicyLengthByType = (policyType, type, setStateName) => {
    const mounted = useMounted()
    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("policies")
            .where("policyType", "==", policyType)
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                if (mounted.current) {
                    setStateName(documents)
                }
            })
        return () => unsubscribe()
    }, [mounted, policyType, setStateName])
    return { type }
}
export const useGetCalendar = () => {
    const [events, setData] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collectionGroup("calendar")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id,
                        start: doc.data().start.toDate(),
                    })
                })
                setData(documents)
            })
        return () => unsubscribe()
    }, [])
    return { events }
}
export const useGetEventsByID = (id) => {
    const [events, setData] = useState([])

    useEffect(() => {
        const unsubscribe = fireDb
            .collection("customers")
            .doc(id)
            .collection("events")
            .orderBy("createdAt", "desc")
            .onSnapshot((snap) => {
                const documents = []
                snap.forEach((doc) => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                })
                setData(documents)
            })
        return () => unsubscribe()
    }, [id])
    return { events }
}
