import { View, Text } from "@react-pdf/renderer"
import { FC } from "react"

interface Dependents {
    dependentFirstName: string
    dependentLastName: string
    dependentSSN: string
    dependentDOB: string
    dependentCitizenship: string
    dependentRelation: string
}

interface DependentsPDF {
    dependents: Dependents[]
    styles: any
}

const DependentsSection: FC<DependentsPDF> = (props) => {
    const { styles, dependents } = props
    return (
        <View style={styles.tableBody}>
            <View style={styles.tableRow}>
                <View style={styles.cellD1}>
                    <Text style={[styles.body2]}>Name</Text>
                </View>
                <View style={styles.cellD2}>
                    <Text style={[styles.body2]}>SSN</Text>
                </View>
                <View style={styles.cellD2}>
                    <Text style={[styles.body2]}>DOB</Text>
                </View>
                <View style={styles.cellD2}>
                    <Text style={[styles.body2]}>Citizenship</Text>
                </View>
                <View style={styles.cellDLast}>
                    <Text style={[styles.body2]}>Relationship</Text>
                </View>
            </View>
            {dependents?.map((x, i) => (
                <View key={i} style={styles.tableRow}>
                    <View style={styles.cellD1}>
                        <Text style={styles.data}>
                            {x.dependentFirstName + " " + x.dependentLastName ||
                                "N/A"}
                        </Text>
                    </View>
                    <View style={styles.cellD2}>
                        <Text style={[styles.data]}>
                            {x.dependentSSN || "N/A"}
                        </Text>
                    </View>
                    <View style={styles.cellD2}>
                        <Text style={[styles.data]}>
                            {x.dependentDOB || "N/A"}
                        </Text>
                    </View>
                    <View style={styles.cellD2}>
                        <Text style={[styles.data]}>
                            {x.dependentCitizenship || "N/A"}
                        </Text>
                    </View>
                    <View style={styles.cellDLast}>
                        <Text style={[styles.data]}>
                            {x.dependentRelation || "N/A"}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default DependentsSection
