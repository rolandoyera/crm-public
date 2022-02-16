import { useContext, useEffect } from "react"
import type { FC, ChangeEvent } from "react"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Box, Card, Divider, Grid, Tab, Tabs } from "@mui/material"
import Typography from "@mui/material/Typography"
import { CRM } from "lib/constants"
import PersonPinIcon from "@mui/icons-material/PersonPin"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import FavoriteIcon from "@mui/icons-material/Favorite"
import {
    ContactDetailsView,
    SpouseView,
    UserManagementView,
    DependentDetailsView,
    Overview,
    BeneficiaryDetailsView,
    HealthPolicyView,
    LifePolicyView,
} from "components/dashboard/customer/View"
import { useGetCustomerById } from "lib/useFirestore"
import { useGetDependents } from "lib/useDependents"
import { useGetAllPoliciesByCustomerId } from "lib/usePolicies"
import { ReactComponent as Sad } from "../../../../assets/sad.svg"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { useGetBeneficiaries } from "lib/useBeneficiaries"
import { HealthCard, LifeCard } from "components/dashboard/splash-cards"
import ShieldIcon from "@mui/icons-material/Shield"
import AddPolicyButton from "components/dashboard/customer/AddPolicyButton/AddPolicyButton"
import { TabsContext } from "contexts/TabsContext"
import toast from "react-hot-toast"
import { Events } from "components/dashboard/customer/View"

const CustomerDetails: FC = () => {
    const { id } = useParams()

    const { currentTab, setCurrentTab } = useContext(TabsContext)

    const { customer, customerHasError } = useGetCustomerById(id)
    const { dependents } = useGetDependents(id)
    const { policies, isPoliciesLoading } = useGetAllPoliciesByCustomerId(id)
    const { beneficiaries } = useGetBeneficiaries(id)

    const hasHealth = policies?.filter((x) => {
        return x.policyType === "Health"
    })
    const hasLife = policies?.filter((x) => {
        return x.policyType === "Life"
    })

    const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
        setCurrentTab(value)
    }

    useEffect(() => {
        if (!customer) {
            return null
        }
        if (customerHasError.length > 0) {
            toast.error(customerHasError)
        }
    }, [customerHasError, customer])

    return (
        <>
            <Helmet>
                <title>
                    {customer.isProspect === true
                        ? "Prospect Details "
                        : "Customer Details "}
                    | {CRM.name}
                </title>
            </Helmet>
            <Box
                sx={{
                    minHeight: "100%",
                    p: 3,
                    mx: "auto",
                }}
            >
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Tabs
                        className="tabs-container"
                        indicatorColor="primary"
                        onChange={handleTabsChange}
                        textColor="primary"
                        value={currentTab}
                        scrollButtons
                        variant="scrollable"
                    >
                        <Tab
                            iconPosition="start"
                            icon={<DashboardIcon sx={{ fontSize: "1.2rem" }} />}
                            label={"Dashboard"}
                            value={"overview"}
                            disableRipple
                        />
                        <Tab
                            iconPosition="start"
                            icon={<FavoriteIcon sx={{ fontSize: "1.2rem" }} />}
                            label={"Health"}
                            value={"health"}
                            disableRipple
                        />
                        <Tab
                            iconPosition="start"
                            icon={
                                <AccessibilityNewIcon
                                    sx={{ fontSize: "1.2rem" }}
                                />
                            }
                            label={"Life"}
                            value={"life"}
                            disableRipple
                        />

                        <Tab
                            iconPosition="start"
                            icon={<ShieldIcon sx={{ fontSize: "1.2rem" }} />}
                            label={"All Policies"}
                            value={"policies"}
                            disableRipple
                        />
                        <Tab
                            iconPosition="start"
                            icon={<PersonPinIcon sx={{ fontSize: "1.2rem" }} />}
                            label={"Management"}
                            value={"management"}
                            disableRipple
                        />
                    </Tabs>

                    <Box className="policy-button">
                        <AddPolicyButton hasHealth={hasHealth} />
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ mt: 3 }}>
                    {currentTab === "overview" && (
                        <Overview
                            isPoliciesLoading={isPoliciesLoading}
                            customer={customer}
                            policies={policies}
                            setCurrentTab={setCurrentTab}
                        />
                    )}
                    {currentTab === "health" && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <ContactDetailsView customer={customer} />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <SpouseView customer={customer} />
                            </Grid>
                            {hasHealth.length === 1 ? (
                                hasHealth.map((policy, i) => {
                                    return (
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            lg={4}
                                            key={i}
                                        >
                                            <HealthPolicyView
                                                policy={policy}
                                                customer={customer}
                                            />
                                        </Grid>
                                    )
                                })
                            ) : (
                                <Grid item xs={12} md={4}>
                                    <HealthCard id={id} />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <DependentDetailsView
                                    dependents={dependents}
                                    customer={customer}
                                />
                            </Grid>
                        </Grid>
                    )}
                    {currentTab === "life" && (
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <ContactDetailsView customer={customer} />
                            </Grid>
                            {hasLife.length === 1 ? (
                                hasLife.map((policy, i) => {
                                    return (
                                        <Grid item xs={12} md={6} key={i}>
                                            <LifePolicyView
                                                policy={policy}
                                                customer={customer}
                                            />
                                        </Grid>
                                    )
                                })
                            ) : (
                                <Grid item xs={12} md={6}>
                                    <LifeCard id={id} />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <BeneficiaryDetailsView
                                    customer={customer}
                                    beneficiaries={beneficiaries}
                                />
                            </Grid>
                        </Grid>
                    )}
                    {currentTab === "policies" && (
                        <Grid container spacing={3}>
                            {policies?.map((policy, i) =>
                                (() => {
                                    switch (policy.policyType) {
                                        case "Health":
                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    key={i}
                                                >
                                                    <HealthPolicyView
                                                        policy={policy}
                                                        customer={customer}
                                                    />
                                                </Grid>
                                            )
                                        case "Life":
                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    key={i}
                                                >
                                                    <LifePolicyView
                                                        policy={policy}
                                                        customer={customer}
                                                    />
                                                </Grid>
                                            )

                                        default:
                                            return null
                                    }
                                })()
                            )}

                            {policies.length < 1 ? (
                                <Grid item xs={12} md={12}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            minHeight: "80vh",
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
                                            <Sad />
                                            <Typography
                                                color="textPrimary"
                                                variant="h6"
                                            >
                                                It's Lonely Here
                                            </Typography>
                                            <AddPolicyButton
                                                hasHealth={hasHealth}
                                            />
                                        </Box>
                                    </Card>
                                </Grid>
                            ) : null}
                        </Grid>
                    )}
                    {currentTab === "management" && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6}>
                                <UserManagementView customer={customer} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Events customer={customer} id={id} />
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default CustomerDetails
