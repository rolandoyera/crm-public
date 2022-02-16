import { formatIncome, formatPhoneNumber } from "../../customer/helpers"
import { View, Text } from "@react-pdf/renderer"

const CustomerSection = (props) => {
    const { styles, customer } = props
    const formattedIncome = formatIncome(customer?.holderIncome)
    const formattedPhone = formatPhoneNumber(customer.holderPhoneNumber)
    const formattedAltPhone = formatPhoneNumber(customer.holderAltPhoneNumber)
    return (
        <View style={styles.tableBody}>
            <View style={styles.tableRow}>
                <View style={styles.cell1Long}>
                    <Text style={styles.body2}>Name: </Text>
                    <Text style={styles.data}>
                        {customer.holderFirstName}{" "}
                        {customer.holderMiddleName
                            ? customer.holderMiddleName + " "
                            : ""}
                        {customer.holderLastName}
                    </Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Phone No:</Text>
                    <Text style={styles.data}>{formattedPhone}</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cell1Long}>
                    <Text style={styles.body2}>E-mail: </Text>
                    <Text style={styles.data}>{customer.holderEmail}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Alt Phone No:</Text>
                    <Text style={styles.data}>{formattedAltPhone}</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cellFull}>
                    <Text style={styles.body2}>Address: </Text>
                    <Text style={styles.data}>{customer.holderAddress}</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cell1}>
                    <Text style={styles.body2}>City:</Text>
                    <Text style={styles.data}>{customer.holderCity}</Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}>State:</Text>
                    <Text style={styles.data}>{customer.holderState}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Zip:</Text>
                    <Text style={styles.data}>{customer.holderZip}</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cell1Long}>
                    <Text style={styles.body2}>Employer: </Text>
                    <Text style={styles.data}>{customer.holderEmployer}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Income:</Text>
                    <Text style={styles.data}>
                        {"$"}
                        {formattedIncome} / yr
                    </Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cell1}>
                    <Text style={styles.body2}>Dependents:</Text>
                    <Text style={styles.data}>{customer.holderDependents}</Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}>Tax Filing Status:</Text>
                    <Text style={styles.data}>{customer.holderTaxStatus}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Citizenship:</Text>
                    <Text style={styles.data}>
                        {customer.holderCitizenship}
                    </Text>
                </View>
            </View>
            <View style={styles.tableRowLast}>
                <View style={styles.cell1}>
                    <Text style={styles.body2}>Date of birth:</Text>
                    <Text style={styles.data}>{customer.holderDOB}</Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}>SSN:</Text>
                    <Text style={styles.data}>{customer.holderSSN}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Tobacco Use:</Text>
                    <Text style={styles.data}>{customer.holderTobacco}</Text>
                </View>
            </View>
        </View>
    )
}

export default CustomerSection
