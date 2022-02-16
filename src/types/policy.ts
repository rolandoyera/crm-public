export interface Policy {
    isVerified: boolean

    policyApplicationNumber: string
    policyApplicationDate: string
    policyCarrier: string
    policyDeductible: number
    policyEffectiveDate: string
    policyMonthlyPremium: number | null
    policyNumber: string
    policyPlan: string
    policySubscribers: number
    policySubsidyAmount: number
    policyTotalMonthlyPremium: number
    policyType: string
}
