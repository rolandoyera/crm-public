import { FC } from "react"

interface TableHeaderProps {
    title: string
}

const TableHeaderSection: FC<TableHeaderProps> = ({ title }) => {
    return (
        <>
            <tr>
                <td
                    colSpan={6}
                    style={{
                        width: "7.3in",
                        border: "1px solid #999999",
                        borderTop: 0,
                        background: "#E6E6E6",
                        padding: "2pt 5.75pt 2pt 5.75pt",
                        height: "12.5pt",
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            textAlign: "center",
                            fontSize: "11px",
                        }}
                    >
                        <span
                            style={{
                                color: "black",
                                fontWeight: "bold",
                            }}
                        >
                            {title}
                        </span>
                    </p>
                </td>
            </tr>
        </>
    )
}

export default TableHeaderSection
