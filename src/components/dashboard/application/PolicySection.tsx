const PolicySection = ({ policy }) => {
    return (
        <>
            <tr>
                <td
                    colSpan={3}
                    style={{
                        width: "66.666%",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Carrier:
                        </span>
                        {policy?.policyCarrier}
                    </p>
                </td>

                <td
                    colSpan={2}
                    style={{
                        width: "auto",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Effective:
                        </span>
                        {policy?.policyEffectiveDate}
                    </p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={2}
                    style={{
                        width: "186.15pt",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Application No:
                        </span>
                        {policy?.policyApplicationNumber}
                    </p>
                </td>
                <td
                    colSpan={2}
                    style={{
                        width: "186.05pt",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Subscriber ID:
                        </span>
                        {policy?.policyNumber}
                    </p>
                </td>
                <td
                    colSpan={2}
                    style={{
                        width: "auto",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Subscribers:
                        </span>
                        {policy?.policySubscribers}
                    </p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={2}
                    style={{
                        width: "186.15pt",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Premium:
                        </span>
                        {"$"}
                        {policy?.policyMonthlyPremium}
                    </p>
                </td>
                <td
                    colSpan={2}
                    style={{
                        width: "186.05pt",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Subsidy:
                        </span>
                        {"$"}
                        {policy?.policySubsidyAmount}
                    </p>
                </td>
                <td
                    colSpan={2}
                    style={{
                        width: "auto",
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
                        <span
                            style={{
                                fontWeight: "bold",
                                marginRight: "7px",
                            }}
                        >
                            Total Premium:
                        </span>
                        {"$"}
                        {policy?.policyTotalMonthlyPremium}
                    </p>
                </td>
            </tr>
        </>
    )
}

export default PolicySection
