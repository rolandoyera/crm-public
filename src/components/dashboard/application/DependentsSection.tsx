export const DependentsSection = ({ dependents }) => {
    return (
        <>
            <tr>
                <td
                    style={{
                        textAlign: "center",
                        width: "25%",
                        border: "1px solid #999999",
                        borderTop: 0,
                        padding: "2pt 5.75pt 2pt 5.75pt",
                        height: "15pt",
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            fontSize: "11px",
                        }}
                    >
                        Name
                    </p>
                </td>
                <td
                    style={{
                        textAlign: "center",
                        width: "18.75%",
                        borderTop: 0,
                        borderLeft: 0,
                        borderBottom: "1px solid #999999 ",
                        borderRight: "1px solid #999999",
                        padding: "2pt 5.75pt 2pt 5.75pt",
                        height: "15pt",
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            fontSize: "11px",
                        }}
                    >
                        SSN
                    </p>
                </td>
                <td
                    style={{
                        textAlign: "center",
                        width: "18.75%",
                        borderTop: 0,
                        borderLeft: 0,
                        borderBottom: "1px solid #999999 ",
                        borderRight: "1px solid #999999",
                        padding: "2pt 5.75pt 2pt 5.75pt",
                        height: "15pt",
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            fontSize: "11px",
                        }}
                    >
                        DOB
                    </p>
                </td>
                <td
                    style={{
                        textAlign: "center",
                        width: "18.75%",
                        borderTop: 0,
                        borderLeft: 0,
                        borderBottom: "1px solid #999999 ",
                        borderRight: "1px solid #999999",
                        padding: "2pt 5.75pt 2pt 5.75pt",
                        height: "15pt",
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            fontSize: "11px",
                        }}
                    >
                        Citizenship
                    </p>
                </td>
                <td
                    style={{
                        textAlign: "center",
                        width: "18.75%",
                        borderTop: 0,
                        borderLeft: 0,
                        borderBottom: "1px solid #999999 ",
                        borderRight: "1px solid #999999",
                        padding: "2pt 5.75pt 2pt 5.75pt",
                        height: "15pt",
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            fontSize: "11px",
                        }}
                    >
                        Relationship
                    </p>
                </td>
            </tr>
            {dependents?.map((x, i) => (
                <tr key={i}>
                    <td
                        style={{
                            width: "25%",
                            border: "1px solid #999999",
                            borderTop: 0,
                            padding: "2pt 5.75pt 2pt 5.75pt",
                            height: "15pt",
                        }}
                    >
                        <p
                            style={{
                                margin: "0",
                                fontSize: "11px",
                            }}
                        >
                            {x.dependentFirstName + " " + x.dependentLastName ||
                                "N/A"}
                        </p>
                    </td>
                    <td
                        style={{
                            width: "18.75%",
                            borderTop: 0,
                            borderLeft: 0,
                            borderBottom: "1px solid #999999 ",
                            borderRight: "1px solid #999999",
                            padding: "2pt 5.75pt 2pt 5.75pt",
                            height: "15pt",
                        }}
                    >
                        <p
                            style={{
                                margin: "0",
                                fontSize: "11px",
                            }}
                        >
                            {x.dependentSSN || "N/A"}
                        </p>
                    </td>
                    <td
                        style={{
                            width: "18.75%",
                            borderTop: 0,
                            borderLeft: 0,
                            borderBottom: "1px solid #999999 ",
                            borderRight: "1px solid #999999",
                            padding: "2pt 5.75pt 2pt 5.75pt",
                            height: "15pt",
                        }}
                    >
                        <p
                            style={{
                                margin: "0",
                                fontSize: "11px",
                            }}
                        >
                            {x.dependentDOB || "N/A"}
                        </p>
                    </td>
                    <td
                        style={{
                            width: "18.75%",
                            borderTop: 0,
                            borderLeft: 0,
                            borderBottom: "1px solid #999999 ",
                            borderRight: "1px solid #999999",
                            padding: "2pt 5.75pt 2pt 5.75pt",
                            height: "15pt",
                        }}
                    >
                        <p
                            style={{
                                margin: "0",
                                fontSize: "11px",
                            }}
                        >
                            {x.dependentCitizenship || "N/A"}
                        </p>
                    </td>
                    <td
                        style={{
                            width: "18.75%",
                            borderTop: 0,
                            borderLeft: 0,
                            borderBottom: "1px solid #999999 ",
                            borderRight: "1px solid #999999",
                            padding: "2pt 5.75pt 2pt 5.75pt",
                            height: "15pt",
                        }}
                    >
                        <p
                            style={{
                                margin: "0",
                                fontSize: "11px",
                            }}
                        >
                            {x.dependentRelation || "N/A"}
                        </p>
                    </td>
                </tr>
            ))}
        </>
    )
}
