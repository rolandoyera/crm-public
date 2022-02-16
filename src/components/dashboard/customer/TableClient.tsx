import {
    Box,
    Paper,
    Divider,
    IconButton,
    Chip,
    Typography,
    TextField,
} from "@mui/material"
import { useGetActiveClientsLimited } from "lib/useFirestore"
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarExport,
} from "@mui/x-data-grid"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import GridViewIcon from "@mui/icons-material/GridView"
import EditIcon from "@mui/icons-material/Edit"
import { useContext, useEffect, useState } from "react"
import kFormatter from "lib/kFormatter"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { TabsContext } from "contexts/TabsContext"
import toast from "react-hot-toast"

const TableClient = () => {
    const [amount, setAmount] = useState(5)

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }
    const { clients, clientsHasError } = useGetActiveClientsLimited(amount)
    const [pageSize, setPageSize] = useState(15)
    const { setCurrentTab } = useContext(TabsContext)
    const navigate = useNavigate()
    const columns: GridColDef[] = [
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            align: "center",
            filterable: false,
            sortable: false,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => {
                            setCurrentTab("overview")
                            navigate(`/dashboard/customers/${params.row.id}`)
                        }}
                    >
                        <GridViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        component={RouterLink}
                        to={`/dashboard/customers/edit-client-details/${params.row.id}`}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </>
            ),
        },
        {
            field: "holderFirstName",
            headerName: "First Name",
            minWidth: 140,
        },
        {
            field: "holderLastName",
            headerName: "Last Name",
            minWidth: 140,
        },
        {
            field: "isCustomer",
            headerName: "Type",
            headerAlign: "center",
            minWidth: 110,
            align: "center",
            renderCell: (params: any) => {
                switch (params.row.isCustomer) {
                    case true:
                        return (
                            <Chip
                                sx={{
                                    height: "1.5rem",
                                    fontSize: ".75rem",
                                    fontWeight: 600,
                                }}
                                color="success"
                                variant="outlined"
                                label={"Client"}
                            />
                        )

                    case false:
                        return null
                    default:
                        return null
                }
            },
        },
        {
            field: "source",
            headerName: "Source",
            minWidth: 150,
        },
        {
            field: "holderAddress",
            headerName: "Address",
            flex: 1,
            hide: true,
        },
        {
            field: "holderCity",
            headerName: "City",
            flex: 1,
            hide: true,
        },
        {
            field: "holderState",
            headerName: "State",
            minWidth: 100,
        },
        {
            field: "holderZip",
            headerName: "Zip",
            minWidth: 100,
            hide: true,
        },
        {
            field: "createdAt",
            headerName: "Created",
            hide: true,
            minWidth: 100,
            valueFormatter: (params: any) => {
                const valueFormatted = new Date(
                    params.value.seconds * 1000
                ).toLocaleDateString("en-US")

                return `${valueFormatted} `
            },
        },
        {
            field: "hasHealth",
            headerName: "Health",
            minWidth: 90,
            hide: false,
            type: "boolean",
            renderCell: (params: any) => {
                switch (params.row.hasHealth) {
                    case true:
                        return <CheckCircleOutlineIcon color="success" />

                    case false:
                        return <HighlightOffIcon color="error" />
                    default:
                        return null
                }
            },
        },
        {
            field: "hasLife",
            headerName: "Life",
            minWidth: 90,
            hide: false,
            type: "boolean",
            renderCell: (params: any) => {
                switch (params.row.hasLife) {
                    case true:
                        return <CheckCircleOutlineIcon color="success" />
                    case false:
                        return <HighlightOffIcon color="error" />
                    case null:
                        return <HighlightOffIcon color="error" />
                    case undefined:
                        return <HighlightOffIcon color="error" />
                    default:
                        return null
                }
            },
        },
        {
            field: "householdIncome",
            headerName: "Income",
            minWidth: 90,
            valueFormatter: (params) => {
                const valueFormatted = kFormatter(params.value)
                return `$${valueFormatted}`
            },
        },
        {
            field: "spouse",
            headerName: "Spouse",
            flex: 1,
            hide: true,
        },
        {
            field: "holderDependents",
            headerName: "Dependents",
            minWidth: 110,
        },
        {
            field: "holderTobacco",
            headerName: "Tobacco Use",
            flex: 1,
            hide: true,
        },
        {
            field: "holderEmail",
            headerName: "Email",
            minWidth: 190,
        },
        {
            field: "holderPhoneNumber",
            headerName: "Phone No",
            minWidth: 140,
        },
    ]

    useEffect(() => {
        if (clientsHasError.length > 0) {
            toast.error(clientsHasError)
        }
    }, [clientsHasError])

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
                            onChange={handleAmountChange}
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
                    rows={clients}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    loading={clients.length === 0}
                />
            </Paper>
        </Box>
    )
}

export default TableClient
