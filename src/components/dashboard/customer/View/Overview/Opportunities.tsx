import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Rating,
    Typography,
} from "@mui/material"
import PolicyIcon from "@mui/icons-material/Policy"
import ShieldIcon from "@mui/icons-material/Shield"
import StarIcon from "@mui/icons-material/Star"
import { useEffect, useState } from "react"

const labels: { [index: string]: string } = {
    1: "1 of 5 ",
    2: "2 of 5 ",
    3: "3 of 5 ",
    4: "4 of 5",
    5: "🔥  🔥  🔥",
}

const Opportunities = ({ policies, id, setCurrentTab }) => {
    const [value, setValue] = useState<number | null>(policies.length)
    const [hover, setHover] = useState(-1)

    useEffect(() => {
        setValue(policies.length)
    }, [policies.length])

    return (
        <Card>
            <CardHeader title={"Opportunities"} />
            <Divider />
            <Box sx={{ mt: 4, height: "309px" }}>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "270px",
                    }}
                    className="fade-in-full"
                >
                    {policies.length < 1 ? null : (
                        <>
                            {" "}
                            <Rating
                                sx={{ fontSize: "3rem" }}
                                value={value}
                                precision={1}
                                onChange={(event, newValue) => {
                                    setValue(newValue)
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover)
                                }}
                                emptyIcon={
                                    <StarIcon
                                        style={{ opacity: 0.55 }}
                                        fontSize="inherit"
                                    />
                                }
                            />
                            {value !== null && (
                                <Box sx={{ mt: 2 }}>
                                    {labels[hover !== -1 ? hover : value]}
                                </Box>
                            )}
                            <Typography
                                className="opp-policy-list"
                                color="textPrimary"
                                variant="h5"
                            >
                                {policies.map((x, i) => (
                                    <span key={i}>{x.policyType}</span>
                                ))}
                            </Typography>
                        </>
                    )}
                </CardContent>
            </Box>
            <BottomNavigation showLabels>
                {policies.length < 1 ? (
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="Add Policy"
                        icon={<ShieldIcon color="primary" fontSize="small" />}
                        onClick={() => setCurrentTab("policies")}
                    />
                ) : (
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="View Policies"
                        icon={<PolicyIcon color="primary" fontSize="small" />}
                        onClick={() => setCurrentTab("policies")}
                    />
                )}
            </BottomNavigation>
        </Card>
    )
}

export default Opportunities
