import { View, Text } from "@react-pdf/renderer"

const PolicySection = (props) => {
    const { styles, policy } = props

    return (
        <View style={styles.tableBody}>
            <View style={styles.tableRow}>
                <View style={styles.cell1Long}>
                    <Text style={styles.body2}>Carrier: </Text>
                    <Text style={styles.data}>{policy?.policyCarrier}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Effective:</Text>
                    <Text style={styles.data}>
                        {policy?.policyEffectiveDate}
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.cell1}>
                    <Text style={styles.body2}>Application No:</Text>
                    <Text style={styles.data}>
                        {policy?.policyApplicationNumber}
                    </Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}>Subscriber ID:</Text>
                    <Text style={styles.data}>{policy?.policyNumber}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Subscribers:</Text>
                    <Text style={styles.data}>{policy?.policySubscribers}</Text>
                </View>
            </View>

            <View style={styles.tableRowLast}>
                <View style={styles.cell1}>
                    <Text style={styles.body2}>Premium:</Text>
                    <Text style={styles.data}>
                        {"$"}
                        {policy?.policyMonthlyPremium}
                    </Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}>Subsidy:</Text>
                    <Text style={styles.data}>
                        {"$"}
                        {policy?.policySubsidyAmount}
                    </Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Total Premium:</Text>
                    <Text style={styles.data}>
                        {"$"}
                        {policy?.policyTotalMonthlyPremium}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default PolicySection
