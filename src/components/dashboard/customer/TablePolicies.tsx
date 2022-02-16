import {
    Box,
    Paper,
    Divider,
    Avatar,
    IconButton,
    Typography,
    TextField,
} from "@mui/material"
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarExport,
} from "@mui/x-data-grid"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import VerifiedIcon from "@mui/icons-material/Verified"
import { useContext, useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import GridViewIcon from "@mui/icons-material/GridView"
import EditIcon from "@mui/icons-material/Edit"
import kFormatter from "lib/kFormatter"
import { useGetPoliciesCreatedAtLimited } from "lib/usePolicies"
import { TabsContext } from "contexts/TabsContext"

const TablePolicies = () => {
    const [amount, setAmount] = useState(5)

    const handleChange = (event) => {
        setAmount(event.target.value)
    }
    const [pageSize, setPageSize] = useState(15)
    const { policies } = useGetPoliciesCreatedAtLimited(amount)
    const { setCurrentTab } = useContext(TabsContext)
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        {
            headerName: "ID",
            field: "id",
            hide: true,
            filterable: false,
            sortable: false,
        },
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            align: "center",
            filterable: false,
            sortable: false,
            width: 150,
            renderCell: (params: any) => {
                switch (params.row.policyType) {
                    case "Health":
                        return (
                            <>
                                <IconButton
                                    to={`/dashboard/customers/${params.row.customerId}`}
                                    component={RouterLink}
                                    onClick={() => {
                                        setCurrentTab("overview")
                                        navigate(``)
                                    }}
                                >
                                    <GridViewIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    component={RouterLink}
                                    to={`/dashboard/customers/${params.row.customerId}/health-policy-edit/${params.row.id}`}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </>
                        )

                    case "Life":
                        return (
                            <>
                                <IconButton
                                    onClick={() => {
                                        setCurrentTab("overview")
                                        navigate(
                                            `/dashboard/customers/${params.row.customerId}`
                                        )
                                    }}
                                >
                                    <GridViewIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    component={RouterLink}
                                    to={`/dashboard/customers/${params.row.customerId}/life-policy-edit/${params.row.id}`}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </>
                        )
                    default:
                        return null
                }
            },
        },
        {
            field: "holderFirstName",
            headerName: "First Name",
            flex: 1,
        },
        {
            field: "holderLastName",
            headerName: "Last Name",
            flex: 1,
        },
        {
            field: "policyType",
            headerName: "Policy",
            headerAlign: "center",
            align: "center",
            flex: 0,
            renderCell: (params: any) => {
                switch (params.row.policyType) {
                    case "Health":
                        return (
                            <Avatar
                                sx={{
                                    backgroundColor: "primary.main",
                                    color: "primary.contrastText",
                                }}
                            >
                                <FavoriteIcon />
                            </Avatar>
                        )

                    case "Life":
                        return (
                            <Avatar
                                sx={{
                                    backgroundColor: "success.main",
                                    color: "primary.contrastText",
                                }}
                            >
                                <AccessibilityNewIcon />
                            </Avatar>
                        )
                    default:
                        return null
                }
            },
        },
        {
            field: "isVerified",
            headerName: "Verified",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params: any) => {
                switch (params.row.isVerified) {
                    case true:
                        return (
                            <VerifiedIcon
                                sx={{ ml: 1, mr: 0.1 }}
                                fontSize="small"
                                color={"success"}
                            />
                        )

                    case false:
                        return (
                            <VerifiedIcon
                                sx={{ ml: 1, mr: 0.1 }}
                                fontSize="small"
                                color={"error"}
                            />
                        )
                    default:
                        return null
                }
            },
        },
        {
            field: "policyCarrier",
            headerName: "Carrier",
            flex: 1,
        },
        {
            field: "policyTotalMonthlyPremium",
            headerName: "Premium",
            headerAlign: "left",
            align: "left",
            flex: 1,
            type: "number",
            valueFormatter: (params) => {
                const numberValue = Number(params.value)
                const valueFormatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                })
                return valueFormatted.format(numberValue)
            },
            valueParser: (params) => Number(params),
        },
        {
            field: "policyPlan",
            headerName: "Plan",
            flex: 1,
        },
        {
            field: "rewards",
            headerName: "Rewards",
            flex: 1,
        },
        {
            field: "holderTobacco",
            headerName: "Tobacco",
            flex: 1,
        },
        {
            field: "spouse",
            headerName: "Spouse",
            flex: 1,
        },

        {
            field: "policySubscribers",
            headerName: "Subscribers",
            flex: 1,
        },
        {
            field: "householdIncome",
            headerName: "Income",
            hide: true,
            flex: 1,
            valueFormatter: (params) => {
                const valueFormatted = kFormatter(params.value)
                return `$${valueFormatted}`
            },
        },
        {
            field: "policyEffectiveDate",
            headerName: "Effective",
            flex: 1,
        },
        {
            field: "policyApplicationDate",
            headerName: "Applied On",
            flex: 1,
        },
        {
            field: "customerId",
            headerName: "CustomerId",
            flex: 1,
            hide: true,
            filterable: false,
            sortable: false,
        },
    ]

    const CustomToolbar = () => {
        return (
            <>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <GridToolbarContainer style={{ padding: "1rem" }}>
                        <GridToolbarFilterButton sx={{ mr: 2 }} />
                        <GridToolbarDensitySelector sx={{ mr: 2 }} />
                        <GridToolbarColumnsButton sx={{ mr: 2 }} />
                        <GridToolbarExport />
                    </GridToolbarContainer>
                    <Box
                        sx={{
                            minWidth: 120,
                            ml: 1,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            color={"primary.main"}
                            fontSize={".8125rem"}
                            fontWeight={600}
                            mr={1.5}
                        >
                            Limit
                        </Typography>
                        <TextField
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={amount}
                            variant="standard"
                            size="small"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={250}>250</option>
                            <option value={1000}>All</option>
                        </TextField>
                    </Box>
                </Box>
                <Divider />
            </>
        )
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <DataGrid
                    columns={columns}
                    checkboxSelection
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[15, 30, 50]}
                    pagination
                    autoHeight
                    density={"standard"}
                    rows={policies}
                    {...policies}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    loading={policies.length === 0}
                />
            </Paper>
        </Box>
    )
}

export default TablePolicies
