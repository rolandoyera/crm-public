export interface CustomerDetailsProps {
    merge?: boolean
    updatedAt?: any
    createdAt?: any
    avatar?: string
    //---------
    holderAddress: string
    holderCitizenship: string
    holderCity: string
    holderDOB: string
    holderEmail: string
    holderEmployer: string
    holderFirstName: string
    holderIncome: number
    holderLastName: string
    holderMiddleName: string
    holderPhoneNumber: string
    holderAltPhoneNumber?: string
    holderSSN: string
    holderState: string
    holderTobacco: string
    holderZip: string
    hcgPassword: string
    hcgUser: string
    id?: string
    isCustomer: boolean
    isProspect: boolean
    isVerified?: string
    policyInterest: string
    source: string
    spouse: string
    spouseAddress: string
    spouseAltPhoneNumber: string
    spouseCity: string
    spouseDOB: string
    spouseEmail: string
    spouseEmployer: string
    spouseFirstName: string
    spouseCitizenship: string
    spouseIncome: number
    spouseLastName: string
    spouseMiddleName: string
    spousePhoneNumber: string
    spouseSSN: string
    spouseState: string
    spouseTobacco: string
    spouseZip: number
    unread?: boolean
}

export interface Customer {
    holderEmail?: string

    holderFirstName?: string

    holderLastName?: string

    holderPhoneNumber?: string
    children: any[]
    holderState?: string
    holderTobacco?: string
    holderZip?: string
    createdAt?: any
    unread?: boolean
    isCustomer: boolean
    dob?: string
    id: string
    firstName?: string
    lastName?: string
    address?: string
    address2?: string
    avatar?: string
    balance?: number
    city?: string
    country?: string
    currency?: string
    email: string
    hasAcceptedMarketing?: boolean
    hasDiscountedPrices?: boolean
    isProspect?: boolean
    isReturning?: boolean
    isVerified?: boolean
    name: string
    phoneNumber?: string
    state?: string
    totalAmountSpent?: number
    totalOrders?: number
    updatedAt?: number
    vatRate?: number
    zip?: string
    policyType?: string
    carrier?: string
    policyNumber?: string
    source?: string
    spouse?: string
    tobacco?: string

    effectiveDate?: string
}

export interface CustomerLog {
    id: string
    createdAt: number
    description: string
    ip: string
    method: string
    route: string
    status: number
}

export interface CustomerEmail {
    id: string
    description: string
    createdAt: number
}

export interface CustomerInvoice {
    id: string
    currency: string
    description: string
    issueDate: number
    paymentMethod: string
    status: string
    value: number
}
