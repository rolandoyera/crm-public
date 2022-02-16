import type { FC } from "react"
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer"
import { Company } from "lib/constants"
import CustomerSection from "./CustomerSection"
import SpouseSection from "./SpouseSection"
import DependentsSection from "./DependentsSection"
import PolicySection from "./PolicySection"

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        paddingTop: 24,
        paddingLeft: 30,
        paddingRight: 10,
    },
    h1: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.235,
    },
    h4: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.235,
    },
    h6: {
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
    },
    subtitle2: {
        fontSize: "9pt",
        fontWeight: 500,
        lineHeight: 1.57,
    },
    body1: {
        fontSize: "10pt",
        fontWeight: "black",
    },
    body2: {
        fontSize: "9pt",
        fontWeight: "black",
        paddingLeft: "5pt",
    },
    body3: {
        fontSize: "9pt",
        fontWeight: "black",
        paddingLeft: "5pt",
        paddingTop: "5pt",
    },
    data: {
        fontSize: "9pt",
        paddingLeft: "4pt",
        fontWeight: "light",
    },
    gutterBottom: {
        paddingLeft: "5pt",
        marginBottom: 4,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: "30px",
    },
    brand: {
        height: 32,
        width: 32,
    },
    company: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
    },
    references: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
    },
    items: {
        marginTop: 32,
    },
    notes: {
        marginTop: 22,
    },
    table: {
        display: "flex",
        width: "7.6in",
    },
    tableHeader: {},
    tableBody: {
        borderWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
    },
    tableRow: {
        width: "7.58in",
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        flexDirection: "row",
        margin: 0,
        height: "16pt",
    },
    tableRowLast: {
        width: "7.58in",
        borderBottomWidth: 0,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        flexDirection: "row",
        margin: 0,
        height: "16pt",
    },
    rowHeader: {
        backgroundColor: "#E6E6E6",
        textAlign: "center",
        width: "7.6in",
        border: 0,
        height: "17pt",
        paddingTop: "3pt",
    },
    rowHeaderPolicy: {
        backgroundColor: "#E6E6E6",
        textAlign: "center",
        width: "7.6in",
        border: 0,
        height: "17pt",
        paddingTop: "3pt",
        marginTop: "17pt",
    },
    cellFull: {
        borderRightWidth: 0,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        padding: "3.25pt 0 0 4.25pt",
        width: "100%",
        height: "16pt",
    },
    cell1: {
        borderRightWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        padding: "3.25pt 0 0 4.25pt",
        width: "33%",
        height: "16pt",
    },
    cell1Long: {
        borderRightWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        padding: "3.25pt 0 0 4.25pt",
        width: "66%",
        height: "16pt",
    },
    cell2: {
        borderRightWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        padding: "3.25pt 0 0 4.25pt",
        width: "33%",
        height: "16pt",
    },
    cell3: {
        borderRightWidth: 0,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        padding: "3.25pt 0 0 4.25pt",
        width: "auto",
        height: "16pt",
    },
    cellD1: {
        borderRightWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "3.25pt 0 0 4.25pt",
        width: "25%",
        height: "16pt",
    },
    cellD2: {
        borderRightWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "3.25pt 0 0 4.25pt",
        width: "18.75%",
        height: "16pt",
    },
    cellDLast: {
        borderRightWidth: 0,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "3.25pt 0 0 4.25pt",
        width: "18.75%",
        height: "16pt",
    },
})

interface ApplicationPDFProps {
    dependents?: any
    customer?: any
    policy?: any
    hasHealthNote: any
}
const ApplicationPDF: FC<ApplicationPDFProps> = (props) => {
    const { customer, dependents, policy, hasHealthNote } = props

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.h1}>{Company.name}</Text>
                        <Text style={styles.subtitle2}>
                            {policy.policyType + " Insurance Application"}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.h6}>State</Text>
                        <Text style={styles.subtitle2}>
                            {customer.holderState}
                        </Text>
                    </View>
                </View>

                <View style={styles.items}>
                    <Text style={styles.subtitle2}>
                        Application Date: {policy.policyApplicationDate}
                    </Text>
                    <View style={styles.table}>
                        <View style={styles.rowHeader}>
                            <Text style={styles.body1}>
                                Policy Holder Information
                            </Text>
                        </View>
                        <CustomerSection styles={styles} customer={customer} />
                        <View style={styles.rowHeader}>
                            <Text style={styles.body1}>Spouse Information</Text>
                        </View>
                        <SpouseSection styles={styles} customer={customer} />
                        <View style={styles.rowHeader}>
                            <Text style={styles.body1}>
                                Dependents Information
                            </Text>
                        </View>
                        <DependentsSection
                            dependents={dependents}
                            styles={styles}
                        />
                        <View style={styles.rowHeaderPolicy}>
                            <Text style={styles.body1}>Policy Information</Text>
                        </View>
                        <PolicySection
                            styles={styles}
                            customer={customer}
                            policy={policy}
                        />
                    </View>
                </View>
                <View style={styles.notes}>
                    <Text style={[styles.h6, styles.gutterBottom]}>Notes:</Text>
                    <Text style={styles.body2}>
                        {hasHealthNote.map((n, i) => (
                            <Text key={i} style={styles.body2}>
                                {n.note}
                            </Text>
                        ))}
                    </Text>
                </View>
                <View style={styles.notes}>
                    <Text style={[styles.h6, styles.gutterBottom]}>
                        healthcare.gov:
                    </Text>
                    <Text style={styles.body2}>
                        Username: {customer.hcgUser}
                    </Text>
                    <Text style={styles.body3}>
                        Password: {customer.hcgPassword}
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

export default ApplicationPDF
