import toast from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"
import {
    Card,
    CardHeader,
    Divider,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    BottomNavigationAction,
    BottomNavigation,
} from "@mui/material"
import TrashIcon from "icons/Trash"
import { fireDb } from "lib/firebase"
import { useConfirmation } from "contexts/ConfirmContext/ConfirmationServiceContext"
import PencilAltIcon from "icons/PencilAlt"

const UserManagementView = ({ customer, ...props }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const confirm = useConfirmation()

    const useConfirm = () => {
        confirm({
            catchOnCancel: true,
            title: "Are you sure?",
            description: "This action cannot be undone.",
        })
            .then(() => onDelete(id))
            .catch(() => null)
    }
    const onDelete = async (id) => {
        try {
            await fireDb.collection("customers").doc(id).delete()

            toast.success("Client Deleted")
            navigate("/dashboard/customers")
        } catch (error) {
            toast.error("Something went wrong")
            console.error(error)
        }
    }

    return (
        <>
            <Card {...props}>
                <CardHeader title="Client Management" />
                <Divider />
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Source
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {customer.source}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Entry Created
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {new Date(
                                        customer?.createdAt?.seconds * 1000
                                    ).toLocaleDateString([], {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}{" "}
                                    at{" "}
                                    {new Date(
                                        customer?.createdAt?.seconds * 1000
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Last Entry Change
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {customer.updatedAt
                                        ? new Date(
                                              customer.updatedAt?.seconds * 1000
                                          ).toLocaleDateString("en-US") +
                                          " at " +
                                          new Date(
                                              customer.updatedAt?.seconds * 1000
                                          ).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : "No Changes"}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    User Name
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                    fontSize={"small"}
                                >
                                    Healthcare.gov
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {customer.hcgUser}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Password
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                    fontSize={"small"}
                                >
                                    Healthcare.gov
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {customer.hcgPassword}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="Edit"
                        icon={
                            <PencilAltIcon color="primary" fontSize="small" />
                        }
                        onClick={() =>
                            navigate(
                                `/dashboard/customers/edit-management/${id}`
                            )
                        }
                    />
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="Delete Account"
                        icon={
                            <TrashIcon
                                sx={{ color: "error.main" }}
                                fontSize="small"
                            />
                        }
                        onClick={useConfirm}
                    />
                </BottomNavigation>
            </Card>
        </>
    )
}

export default UserManagementView
