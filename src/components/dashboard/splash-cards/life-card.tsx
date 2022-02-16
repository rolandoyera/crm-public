import {
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Card,
    Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import PlusIcon from "icons/Plus"

const LifeCard = ({ id }) => {
    const navigate = useNavigate()

    return (
        <>
            <Card
                sx={{
                    height: "630px",
                }}
            >
                <Box
                    sx={{
                        height: "574px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <AccessibilityNewIcon fontSize="large" />
                        <Typography color="textPrimary" variant="h6">
                            Life Insurance Policy
                        </Typography>
                        <Button
                            color="primary"
                            component={RouterLink}
                            startIcon={<PlusIcon fontSize="small" />}
                            sx={{ m: 1 }}
                            to={`/dashboard/customers/add-life-policy/${id}`}
                            variant="text"
                        >
                            ADD
                        </Button>
                    </Box>
                </Box>
                <BottomNavigation
                    sx={{
                        marginTop: "auto",
                        mb: 0,
                    }}
                    showLabels
                >
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="Add Life"
                        icon={
                            <AddCircleIcon color="primary" fontSize="small" />
                        }
                        onClick={() =>
                            navigate(
                                `/dashboard/customers/add-life-policy/${id}`
                            )
                        }
                    />
                </BottomNavigation>
            </Card>
        </>
    )
}

export default LifeCard
