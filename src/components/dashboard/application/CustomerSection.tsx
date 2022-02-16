import { formatPhoneNumber } from "../customer/helpers"
import NumberFormat from "react-number-format"

const CustomerSection = ({ customer }) => {
    const formattedPhone = formatPhoneNumber(customer.holderPhoneNumber)
    const formattedAltPhone = formatPhoneNumber(customer.holderAltPhoneNumber)
    return (
        <>
            <tr>
                <td
                    colSpan={4}
                    style={{
                        width: "4.3in",
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
                        {customer.holderFirstName} {customer.holderMiddleName}{" "}
                        {customer.holderLastName}
                    </p>
                </td>
                <td
                    colSpan={1}
                    style={{
                        width: "3in",
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
                            Phone:
                        </span>
                        {formattedPhone}
                    </p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={4}
                    style={{
                        width: "4.3in",
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
                            E-mail:
                        </span>
                        {customer.holderEmail}
                    </p>
                </td>
                <td
                    colSpan={1}
                    style={{
                        width: "3in",
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
                            Alt Phone:
                        </span>
                        {formattedAltPhone}
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
                        {customer.holderAddress}
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
                        {customer.holderCity}
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
                        {customer.holderState}
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
                        </span>
                        {customer.holderZip}
                    </p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={4}
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
                        {customer.holderEmployer}
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
                            Income:
                        </span>
                        <NumberFormat
                            value={customer?.holderIncome}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="$"
                        />{" "}
                        / yr
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
                            Dependents:
                        </span>
                        {customer.holderDependents}
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
                            Tax Filing Status:
                        </span>

                        {customer.holderTaxStatus}
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
                        {customer.holderCitizenship}
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
                        {customer.holderDOB}
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
                        {customer.holderSSN}
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
                            Tobacco Use:
                        </span>
                        {customer.holderTobacco}
                    </p>
                </td>
            </tr>
        </>
    )
}

export default CustomerSection
