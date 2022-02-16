import { useState } from "react"
import PropTypes from "prop-types"
import Card from "@mui/material/Card"
import PencilAltIcon from "icons/PencilAlt"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"
import { useParams, useNavigate } from "react-router-dom"
import BottomNavigation from "@mui/material/BottomNavigation"
import { Table, TableBody, TableCell, TableRow } from "@mui/material"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"

import { formatPhoneNumber, normalizeInput } from "../helpers"
import NumberFormat from "react-number-format"

const ContactDetailsView = ({ customer, ...props }) => {
    const [value, setValue] = useState()
    const navigate = useNavigate()
    const { id } = useParams()
    const formattedPhone = formatPhoneNumber(customer.holderPhoneNumber)
    const formattedAltPhone = formatPhoneNumber(customer.holderAltPhoneNumber)
    const normalizedInput = normalizeInput(customer.holderSSN)

    return (
        <Card {...props}>
            <CardHeader title="Contact Details" />
            <Divider />

            <Table>
                <TableBody>
                    <TableRow className="form-table-row">
                        <TableCell colSpan={1}>
                            <Typography color="textPrimary" variant="subtitle2">
                                Full Name
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderFirstName || "-"}{" "}
                                {customer.holderMiddleName
                                    ? customer.holderMiddleName
                                    : " "}{" "}
                                {customer.holderLastName || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Email
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderEmail || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell colSpan={1}>
                            <Typography color="textPrimary" variant="subtitle2">
                                Phone
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {formattedPhone || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Alt Phone
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {formattedAltPhone || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Address
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderAddress || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                City
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderCity || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                State
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderState || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Zip Code
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderZip || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell colSpan={1}>
                            <Typography color="textPrimary" variant="subtitle2">
                                DOB
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderDOB || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                SSN
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {normalizedInput || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Citizenship
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderCitizenship || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Tobacco User
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderTobacco || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Employer
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderEmployer || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Annual Income
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                <NumberFormat
                                    value={customer?.holderIncome}
                                    displayType="text"
                                    thousandSeparator={true}
                                    prefix="$"
                                />
                                {/* {"$"} {totalFormattedIncome || "-"} */}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow className="form-table-row">
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Filing Status
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderTaxStatus || "-"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textPrimary" variant="subtitle2">
                                Dependents
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {customer.holderDependents || "-"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction
                    className="bottom-nav"
                    label="Edit"
                    icon={<PencilAltIcon color="primary" fontSize="small" />}
                    onClick={() =>
                        navigate(
                            `/dashboard/customers/edit-client-details/${id}`
                        )
                    }
                />
            </BottomNavigation>
        </Card>
    )
}

ContactDetailsView.propTypes = {
    holderAddress: PropTypes.string,
    holderCity: PropTypes.string,
    holderEmail: PropTypes.string,
    holderPhoneNumber: PropTypes.string,
    holderState: PropTypes.string,
    holderZip: PropTypes.string,
}

export default ContactDetailsView
