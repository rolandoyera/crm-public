interface InvoiceCustomer {
    holderFirstName?: string
    address?: string
    city?: string
    state?: string
    zip?: string
    company?: string
    email: string
    name: string
    taxId?: string
}

interface InvoiceItem {
    id: string
    currency: string
    description: string
    unitAmount: number
}

export type InvoiceStatus = "canceled" | "paid" | "pending"

export interface Invoice {
    holderAddress?: string
    holderCitizenship?: string
    holderCity?: string
    holderDOB?: string
    holderEmail?: string
    holderEmployer?: string
    holderFirstName?: string
    holderIncome?: number
    holderLastName?: string
    holderMiddleName?: string
    holderPhoneNumber?: string
    holderSSN?: string
    holderState?: string
    holderTobacco?: string
    holderZip?: string
    policyApplicationNumber?: string
    policyCarrier?: string
    policyEffectiveDate?: string
    policyNumber?: string
    policyPlan?: string | number | boolean
    spouseFirstName?: string
    spouseMiddleName?: string
    spouseLastName?: string
    spouseEmail?: string
    spousePhoneNumber?: string
    spouseAddress?: string
    spouseZip?: string
    spouseCitizenship?: string
    spouseCity?: string
    spouseState?: string
    spouseDOB?: string
    spouseTobacco?: string
    id: string
    currency: string
    customer: InvoiceCustomer
    dueDate?: number
    issueDate?: number
    items?: InvoiceItem[]
    number?: string
    status: InvoiceStatus
    subtotalAmount?: number
    taxAmount?: number
    totalAmount?: number
}
