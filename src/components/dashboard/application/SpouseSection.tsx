import { formatIncome, formatPhoneNumber } from "../customer/helpers"

const SpouseSection = ({ customer }) => {
    const formattedIncome = formatIncome(customer?.spouseIncome)
    const formattedPhone = formatPhoneNumber(customer.spousePhoneNumber)

    return (
        <>
            <tr>
                <td
                    colSpan={6}
                    style={{
                        width: "7.3in",
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
                            Name:
                        </span>
                        {customer.spouseFirstName} {customer.spouseMiddleName}{" "}
                        {customer.spouseLastName}
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
                            Date of birth:
                        </span>
                        {customer.spouseDOB}
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
                            SSN:
                        </span>
                        {customer.spouseSSN}
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
                            Phone:
                        </span>
                        {formattedPhone}
                    </p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={6}
                    style={{
                        width: "7.3in",
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
                            Address:
                        </span>

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
                            City:
                        </span>
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
                            State:
                        </span>
                        {""}
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
                            ZIP Code:
                        </span>{" "}
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
                            Employer:
                        </span>
                        {customer.spouseEmployer}
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
                            Income:
                        </span>
                        {"$"}
                        {formattedIncome} /yr
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
                            Citizenship:
                        </span>
                        {customer.spouseCitizenship}
                    </p>
                </td>
            </tr>
        </>
    )
}

export default SpouseSection
