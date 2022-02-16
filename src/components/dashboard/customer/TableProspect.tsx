import { Box, Paper, Divider, Avatar, IconButton, Chip } from "@mui/material"
import { useGetActiveProspects } from "lib/useFirestore"
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
import kFormatter from "lib/kFormatter"
import { fireDb } from "lib/firebase"
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

const TableProspect = () => {
    const { prospects } = useGetActiveProspects()
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
            width: 150,
            hideSortIcons: true,
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
            headerName: "First Name",
            minWidth: 130,
        },
        {
            field: "holderLastName",
            headerName: "Last Name",
            minWidth: 170,
        },
        {
            field: "unread",
            headerName: "New",
            headerAlign: "center",
            flex: 0,
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
            minWidth: 110,
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
            field: "policyInterest",
            headerName: "Interest",
            headerAlign: "center",
            minWidth: 110,
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
            minWidth: 110,
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
            field: "createdAt",
            headerName: "Created",
            minWidth: 110,
            valueFormatter: (params: any) => {
                const valueFormatted = formatDistance(
                    subHours(new Date(params.value.seconds * 1000), 0),
                    new Date(),
                    { addSuffix: true }
                )
                return `${valueFormatted} `
            },
        },
        {
            field: "householdIncome",
            headerName: "Income",
            minWidth: 110,
            valueFormatter: (params) => {
                const valueFormatted = kFormatter(params.value)
                return `$${valueFormatted}`
            },
        },
        {
            field: "spouse",
            headerName: "Spouse",
            minWidth: 90,
        },
        {
            field: "holderDependents",
            headerName: "Dependents",
            minWidth: 110,
        },
        {
            field: "holderTobacco",
            headerName: "Tobacco Use",
            minWidth: 120,
        },
        {
            field: "holderEmail",
            headerName: "Email",
            minWidth: 160,
        },
        {
            field: "holderPhoneNumber",
            headerName: "Phone No",
            minWidth: 140,
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
                    rows={prospects}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    loading={prospects.length === 0}
                />
            </Paper>
        </Box>
    )
}

export default TableProspect
