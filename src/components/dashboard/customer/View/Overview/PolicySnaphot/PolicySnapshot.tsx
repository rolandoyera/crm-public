import Box from "@mui/material/Box"
import CardHeader from "@mui/material/CardHeader"
import Card from "@mui/material/Card"
import BottomNavigation from "@mui/material/BottomNavigation"
import { Link, BottomNavigationAction } from "@mui/material"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import PolicyIcon from "@mui/icons-material/Policy"
import PlusIcon from "icons/Plus"
import { useParams, useNavigate } from "react-router-dom"
import CarrierBadge from "./CarrierBadge"
import PolicyImage from "assets/insurance2.png"
import EditIcon from "@mui/icons-material/Edit"
import { useEffect, useState } from "react"
import LanguageIcon from "@mui/icons-material/Language"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const PolicySnapshot = ({
    setCurrentTab,
    customer,
    policies,
    isPoliciesLoading,
}) => {
    const hasHealth = policies?.filter((x) => {
        return x.policyType === "Health"
    })
    const healthPolicyId = hasHealth?.map((x) => {
        return x.policyId
    })
    const carrier = hasHealth?.map((x) => {
        return x.policyCarrier
    })

    const navigate = useNavigate()
    const { id } = useParams()

    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsloading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Card>
            <CardHeader title={"Healthcare Policy"} />
            <Divider />

            <Box
                sx={{
                    width: "100%",
                    minHeight: {
                        xs: "390px",
                        sm: "370px",
                    },
                    display: "flex",
                    mb: 0,
                    p: {
                        xs: 2,
                        sm: 3,
                    },
                    position: "relative",
                }}
            >
                {hasHealth?.length > 0 ? (
                    hasHealth?.map((health, index) => (
                        <Card
                            key={index}
                            className="fade-in-full"
                            sx={{
                                width: "100%",
                                height: {
                                    xs: "fit-content",
                                    sm: "320px",
                                },
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <CarrierBadge health={health} />
                                <Box>
                                    <Box display={"flex"} mt={1.5}>
                                        <Typography variant="body2" mr={1}>
                                            Plan:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health?.policyPlan}
                                        </Typography>
                                    </Box>
                                    <Box display={"flex"} mt={1}>
                                        <Typography variant="body2" mr={1}>
                                            Effective:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health?.policyEffectiveDate}
                                        </Typography>
                                    </Box>
                                    <Box display={"flex"} mt={1}>
                                        <Typography variant="body2" mr={1}>
                                            Applied:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health.policyApplicationDate}
                                        </Typography>
                                    </Box>
                                    <Box display={"flex"} mt={1}>
                                        <Typography variant="body2" mr={1}>
                                            Premium:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health.policyMonthlyPremium
                                                ? `$${health.policyMonthlyPremium}`
                                                : "-"}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            ml={2}
                                            mr={1}
                                        >
                                            Subsidy:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health.policySubsidyAmount
                                                ? `$${health.policySubsidyAmount}`
                                                : "-"}
                                        </Typography>
                                    </Box>
                                    <Box display={"flex"} mt={1}>
                                        <Typography variant="body2" mr={1}>
                                            Net Premium:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health.policyTotalMonthlyPremium
                                                ? `$${health.policyTotalMonthlyPremium}`
                                                : "-"}
                                        </Typography>
                                    </Box>
                                    <Box display={"flex"} mt={1}>
                                        <Typography variant="body2" mr={1}>
                                            Deductible:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health.policyDeductible
                                                ? `$${health.policyDeductible}`
                                                : "-"}
                                        </Typography>
                                    </Box>
                                    <Box display={"flex"} mt={1}>
                                        <Typography variant="body2" mr={1}>
                                            Rewards:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {health.rewards}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    ))
                ) : (
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                        sx={{ width: "100%" }}
                        className={` ${isLoading ? "hidden" : "visible"}`}
                    >
                        <img
                            src={PolicyImage}
                            alt="Policy"
                            style={{
                                width: "90px",
                                marginBottom: ".8rem",
                            }}
                        />
                        <Typography sx={{ mt: 2, mb: -2 }}>
                            ...no policies
                        </Typography>
                    </Box>
                )}
            </Box>

            {hasHealth.length < 1 ? (
                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="Add Policy"
                        icon={<PlusIcon color="primary" fontSize="small" />}
                        onClick={() =>
                            navigate(
                                `/dashboard/customers/add-health-policy/${id}`
                            )
                        }
                    />
                </BottomNavigation>
            ) : (
                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="View Policy"
                        icon={<PolicyIcon color="primary" fontSize="small" />}
                        onClick={() => setCurrentTab("policies")}
                    />
                    <BottomNavigationAction
                        className="bottom-nav"
                        label="Edit Policy"
                        icon={<EditIcon color="primary" fontSize="small" />}
                        onClick={() =>
                            navigate(
                                `/dashboard/customers/${id}/health-policy-edit/${healthPolicyId}`
                            )
                        }
                    />
                    {(() => {
                        switch (`${carrier}`) {
                            case "Aetna":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.aetna.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Ambetter":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.ambetterhealth.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "AvMed":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.avmed.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "BCBS":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.floridablue.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Bright Healthcare":
                                return (
                                    <BottomNavigationAction
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        className="bottom-nav"
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://brighthealthcare.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Cigna":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.cigna.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Florida Blue":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.floridablue.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Friday Health":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.fridayhealthplans.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Molina Healthcare":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.molinahealthcare.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Oscar Health":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.hioscar.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "United Healthcare":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.uhc.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            default:
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Carrier Site"
                                        icon={
                                            <LanguageIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                    />
                                )
                        }
                    })()}
                    {(() => {
                        switch (`${carrier}`) {
                            case "Aetna":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.aetna.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Ambetter":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.ambetterhealth.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "AvMed":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.avmed.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "BCBS":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.floridablue.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Bright Healthcare":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://brighthealthcare.com/member"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Cigna":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.cigna.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Florida Blue":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.floridablue.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Friday Health":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.fridayhealthplans.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Molina Healthcare":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.molinahealthcare.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "Oscar Health":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.hioscar.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            case "United Healthcare":
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                        component={Link}
                                        href="https://www.uhc.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                )

                            default:
                                return (
                                    <BottomNavigationAction
                                        className="bottom-nav"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "flex",
                                            },
                                        }}
                                        label="Member Site"
                                        icon={
                                            <AccountCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        }
                                    />
                                )
                        }
                    })()}
                </BottomNavigation>
            )}
        </Card>
    )
}

export default PolicySnapshot
