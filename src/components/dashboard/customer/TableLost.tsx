import { Box, Paper, Divider, Avatar, IconButton, Chip } from "@mui/material"
import { useGetLostByDate } from "lib/useFirestore"
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
import FavoriteIcon from "@mui/icons-material/Favorite"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import GridViewIcon from "@mui/icons-material/GridView"
import EditIcon from "@mui/icons-material/Edit"
import { useContext, useState } from "react"
import { TabsContext } from "contexts/TabsContext"

function CustomToolbar() {
    return (
        <>
            <GridToolbarContainer style={{ padding: "1rem" }}>
                <GridToolbarFilterButton sx={{ mr: 2 }} />
                <GridToolbarDensitySelector sx={{ mr: 2 }} />
                <GridToolbarColumnsButton sx={{ mr: 2 }} />
                <GridToolbarExport />
            </GridToolbarContainer>
            <Divider />
        </>
    )
}

const TableLost = () => {
    const { customers } = useGetLostByDate("customers")
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
            width: 150,
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
            headerName: "First name",
            width: 160,
        },
        {
            field: "holderLastName",
            headerName: "Last name",
            width: 190,
        },
        {
            field: "isProspect",
            headerName: "Type",
            headerAlign: "center",
            flex: 1,
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
            field: "isLost",
            headerName: "Lost",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params: any) => {
                switch (params.row.isLost) {
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
                                label={"Lost"}
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
            field: "policyInterest",
            headerName: "Interest",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params: any) => {
                switch (params.row.policyInterest) {
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
            field: "source",
            headerName: "Source",
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
            flex: 1,
        },
        {
            field: "holderPhoneNumber",
            headerName: "Phone No",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created",
            flex: 1,
            valueFormatter: (params) => {
                const valueFormatted = formatDistance(
                    //@ts-ignore
                    subHours(new Date(params.value.seconds * 1000), 0),
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
                />
            </Paper>
        </Box>
    )
}

export default TableLost
