import { formatIncome, formatPhoneNumber } from "../../customer/helpers"
import { View, Text } from "@react-pdf/renderer"

const SpouseSection = (props) => {
    const { styles, customer } = props
    const formattedIncome = formatIncome(customer?.spouseIncome)
    const formattedPhone = formatPhoneNumber(customer.spousePhoneNumber)
    const formattedAltPhone = formatPhoneNumber(customer.spouseAltPhoneNumber)
    return (
        <View style={styles.tableBody}>
            <View style={styles.tableRow}>
                <View style={styles.cell1Long}>
                    <Text style={styles.body2}>Name: </Text>
                    <Text style={styles.data}>
                        {customer.spouseFirstName}{" "}
                        {customer.spouseMiddleName
                            ? customer.spouseMiddleName + " "
                            : ""}
                        {customer.spouseLastName}
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
                    <Text style={styles.data}>{customer.spouseEmail}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Alt Phone No:</Text>
                    <Text style={styles.data}>{formattedAltPhone}</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cellFull}>
                    <Text style={styles.body2}>Address: </Text>
                    <Text style={styles.data}>
                        {(() => {
                            switch (customer.spouse) {
                                case "Yes":
                                    return (
                                        customer.spouseAddress ||
                                        customer.holderAddress
                                    )
                                case "":
                                    return null
                                case "No":
                                    return null
                                default:
                                    return null
                            }
                        })()}
                    </Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cell1}>
                    <Text style={styles.body2}>City:</Text>
                    <Text style={styles.data}>
                        {(() => {
                            switch (customer.spouse) {
                                case "Yes":
                                    return (
                                        customer.spouseCity ||
                                        customer.holderCity
                                    )
                                case "":
                                    return null
                                case "No":
                                    return null
                                default:
                                    return null
                            }
                        })()}
                    </Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}>State:</Text>
                    <Text style={styles.data}>
                        {(() => {
                            switch (customer.spouse) {
                                case "Yes":
                                    return (
                                        customer.spouseState ||
                                        customer.holderState
                                    )
                                case "":
                                    return null
                                case "No":
                                    return null
                                default:
                                    return null
                            }
                        })()}
                    </Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Zip:</Text>
                    <Text style={styles.data}>
                        {(() => {
                            switch (customer.spouse) {
                                case "Yes":
                                    return (
                                        customer.spouseZip || customer.holderZip
                                    )
                                case "":
                                    return null
                                case "No":
                                    return null
                                default:
                                    return null
                            }
                        })()}
                    </Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.cell1Long}>
                    <Text style={styles.body2}>Employer: </Text>
                    <Text style={styles.data}>{customer.spouseEmployer}</Text>
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
                    <Text style={styles.body2}>Citizenship:</Text>
                    <Text style={styles.data}>
                        {customer.spouseCitizenship}
                    </Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}></Text>
                    <Text style={styles.data}></Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}></Text>
                    <Text style={styles.data}></Text>
                </View>
            </View>
            <View style={styles.tableRowLast}>
                <View style={styles.cell1}>
                    <Text style={styles.body2}>Date of birth:</Text>
                    <Text style={styles.data}>{customer.spouseDOB}</Text>
                </View>
                <View style={styles.cell2}>
                    <Text style={styles.body2}>SSN:</Text>
                    <Text style={styles.data}>{customer.spouseSSN}</Text>
                </View>
                <View style={styles.cell3}>
                    <Text style={[styles.body2]}>Tobacco Use:</Text>
                    <Text style={styles.data}>{customer.spouseTobacco}</Text>
                </View>
            </View>
        </View>
    )
}

export default SpouseSection
