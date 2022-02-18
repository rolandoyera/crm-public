import {
    Box,
    Paper,
    Divider,
    IconButton,
    Chip,
    Typography,
} from "@mui/material"
import { useGetCustomersByDateLimited } from "lib/useFirestore"
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarExport,
} from "@mui/x-data-grid"
import { subHours, formatDistance } from "date-fns"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import GridViewIcon from "@mui/icons-material/GridView"
import EditIcon from "@mui/icons-material/Edit"
import { useContext, useEffect, useState } from "react"
import { fireDb } from "lib/firebase"
import { TabsContext } from "contexts/TabsContext"
import toast from "react-hot-toast"
import TextField from "@mui/material/TextField"

const TableAll = () => {
    const [amount, setAmount] = useState(5)

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }
    const { customers, customersHasError } =
        useGetCustomersByDateLimited(amount)

    const [pageSize, setPageSize] = useState(15)
    const { setCurrentTab } = useContext(TabsContext)
    const navigate = useNavigate()
    const handleUnread = async (params) => {
        if (params.row.unread === true) {
            await fireDb.collection("customers").doc(params.id).set(
                {
                    unread: false,
                },
                { merge: true }
            )
        } else {
            return null
        }
    }
    const columns: GridColDef[] = [
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            align: "center",
            filterable: false,
            sortable: false,
            minWidth: 130,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => {
                            setCurrentTab("overview")
                            navigate(`/dashboard/customers/${params.row.id}`)
                            handleUnread(params)
                        }}
                    >
                        <GridViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        component={RouterLink}
                        onClick={() => handleUnread(params)}
                        to={`/dashboard/customers/edit-client-details/${params.row.id}`}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </>
            ),
        },
        {
            field: "holderFirstName",
            headerName: "First name",
            width: 160,
        },
        {
            field: "holderLastName",
            headerName: "Last name",
            width: 190,
        },
        {
            field: "unread",
            headerName: "New",
            headerAlign: "center",
            width: 80,
            align: "center",
            renderCell: (params: any) => {
                switch (params.row.unread) {
                    case true:
                        return (
                            <Chip
                                sx={{
                                    height: "1.5rem",
                                    fontSize: ".75rem",
                                    fontWeight: 600,
                                }}
                                color="error"
                                variant="outlined"
                                label={"New"}
                            />
                        )

                    case false:
                        return " "
                    default:
                        return null
                }
            },
        },
        {
            field: "isProspect",
            headerName: "Type",
            headerAlign: "center",
            width: 120,
            align: "center",
            renderCell: (params: any) => {
                switch (params.row.isProspect) {
                    case true:
                        return (
                            <Chip
                                sx={{
                                    height: "1.5rem",
                                    fontSize: ".75rem",
                                    fontWeight: 600,
                                }}
                                color="primary"
                                variant="outlined"
                                label={"Prospect"}
                            />
                        )

                    case false:
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
                    default:
                        return null
                }
            },
        },
        {
            field: "lastContact",
            headerName: "Last Contact",
            minWidth: 150,
            flex: 1,
            valueFormatter: (params) => {
                if (params.value === undefined) {
                    return "Never"
                    // const valueFormatted = formatDistance(
                    //     //@ts-ignore
                    //     subHours(new Date(params.value.seconds * 1000), 0),
                    //     new Date(),
                    //     { addSuffix: true }
                    // )
                    // return `${valueFormatted} `
                } else {
                    const valueFormatted = formatDistance(
                        //@ts-ignore
                        subHours(new Date(params.value.seconds * 1000), 0),
                        new Date(),
                        { addSuffix: true }
                    )
                    return `${valueFormatted} `
                }
            },
        },
        {
            field: "source",
            headerName: "Source",
            minWidth: 150,
            flex: 1,
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
            flex: 1,
            hide: true,
        },
        {
            field: "holderZip",
            headerName: "Zip",
            flex: 1,
            hide: true,
        },
        {
            field: "holderEmail",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "holderPhoneNumber",
            headerName: "Phone No",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created",
            minWidth: 150,
            flex: 1,
            valueFormatter: (params) => {
                const valueFormatted = formatDistance(
                    //@ts-ignore
                    subHours(new Date(params?.value?.seconds * 1000), 0),
                    new Date(),
                    { addSuffix: true }
                )
                return `${valueFormatted} `
            },
        },
        {
            field: "spouse",
            headerName: "Spouse",
            flex: 1,
            hide: true,
        },
        {
            field: "holderTobacco",
            headerName: "Tobacco Use",
            width: 160,
            hide: true,
        },
    ]

    useEffect(() => {
        if (customersHasError.length > 0) {
            toast.error(customersHasError)
        }
    }, [customersHasError])

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
                        <GridToolbarDensitySelector
                            sx={{
                                mr: 2,
                                display: {
                                    xs: "none",
                                    sm: "flex",
                                },
                            }}
                        />
                        <GridToolbarColumnsButton sx={{ mr: 2 }} />
                        <GridToolbarExport
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "flex",
                                },
                            }}
                        />
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
                            <option value={2000}>All</option>
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
                    rows={customers}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    loading={customers.length === 0}
                />
            </Paper>
        </Box>
    )
}

export default TableAll
