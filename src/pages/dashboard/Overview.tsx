import { FC, useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import {
    Box,
    Button,
    Container,
    Fab,
    Grid,
    Tooltip,
    Typography,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import {
    RecentProspects,
    OverviewTotalByCarrier,
    OverviewTotalByType,
    RecentTouchPoints,
    RecentPolicies,
    OverviewTask,
    Important,
} from "components/dashboard/overview"
import PlusIcon from "icons/Plus"
import { Company, CRM } from "lib/constants"
import { firebaseAuth } from "lib/firebase"
import {
    MonthlyGoal,
    MonthlyTracking,
    MonthlyActual,
} from "components/dashboard/overview"
import {
    useGetPolicyLengthByCarrier,
    useGetPolicyLengthByType,
} from "lib/useFirestore"
import DisplayNameModal from "components/authentication/DisplayNameModal"
import { useHealthPoliciesCurrentMonth } from "lib/usePolicies"

interface WeatherProps {
    current:
        | undefined
        | {
              condition: {
                  icon?: string
                  text?: string
              }
              temp_f?: number
          }

    weather: string | undefined
}

const Overview: FC = () => {
    const user = firebaseAuth.currentUser

    const [bcbs, setBcbs] = useState([])
    const useBcbs = useGetPolicyLengthByCarrier(
        "policies",
        "BCBS",
        bcbs,
        setBcbs
    )
    const [bright, setBright] = useState([])
    const useBright = useGetPolicyLengthByCarrier(
        "policies",
        "Bright Healthcare",
        bright,
        setBright
    )
    const [molina, setMolina] = useState([])
    const useMolina = useGetPolicyLengthByCarrier(
        "policies",
        "Molina Healthcare",
        molina,
        setMolina
    )
    const [avmed, setAvmed] = useState([])
    const useAvmed = useGetPolicyLengthByCarrier(
        "policies",
        "Avmed",
        avmed,
        setAvmed
    )
    const [cigna, setCigna] = useState([])
    const useCigna = useGetPolicyLengthByCarrier(
        "policies",
        "Cigna",
        cigna,
        setCigna
    )
    const [ambetter, setAmbetter] = useState([])
    const useAmbetter = useGetPolicyLengthByCarrier(
        "policies",
        "Ambetter",
        ambetter,
        setAmbetter
    )

    const [oscar, setOscar] = useState([])
    const useOscar = useGetPolicyLengthByCarrier(
        "policies",
        "Oscar Health",
        oscar,
        setOscar
    )
    const [suncare, setSuncare] = useState([])
    const useSuncare = useGetPolicyLengthByCarrier(
        "policies",
        "Suncare",
        suncare,
        setSuncare
    )
    const [united, setUnited] = useState([])
    const useUnited = useGetPolicyLengthByCarrier(
        "policies",
        "United Healthcare",
        united,
        setUnited
    )
    const [aetna, setAetna] = useState([])
    const useAetna = useGetPolicyLengthByCarrier(
        "policies",
        "Aetna",
        aetna,
        setAetna
    )
    const [friday, setFriday] = useState([])
    const useFriday = useGetPolicyLengthByCarrier(
        "policies",
        "Friday Health",
        friday,
        setFriday
    )

    const [life, setLife] = useState([])
    const [dental, setDental] = useState([])
    const [vision, setVision] = useState([])
    const { healthPolicies } = useHealthPoliciesCurrentMonth()
    const useLife = useGetPolicyLengthByType("Life", life, setLife)
    const useDental = useGetPolicyLengthByType("Dental", dental, setDental)
    const useVision = useGetPolicyLengthByType("Dental", vision, setVision)

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const apiKey = "112a288dbae54fd2a7914952212511"
    const [weather, setWeather] = useState<WeatherProps | undefined>(undefined)

    const getWeather = useCallback(async () => {
        try {
            await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Miami&aqi=no`
            )
                .then((res) => res.json())
                .then((data) => {
                    setWeather(data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getWeather()
    }, [getWeather])

    const triggerNameModal = () => {
        if (user.displayName === null) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    useEffect(() => {
        triggerNameModal()
    })

    return (
        <>
            <Helmet>
                <title>Overview | {CRM.name}</title>
            </Helmet>
            {user.displayName === null ? (
                open
            ) : (
                <>
                    <Tooltip title="Add">
                        <Fab
                            color="primary"
                            component={RouterLink}
                            to="/dashboard/customers/add"
                            size="medium"
                            sx={{
                                top: 65,
                                margin: (theme) => theme.spacing(2),
                                position: "fixed",
                                right: 0,
                                zIndex: (theme) => theme.zIndex.speedDial,
                                display: {
                                    xs: "flex",
                                    lg: "none",
                                },
                            }}
                        >
                            <PlusIcon fontSize="medium" />
                        </Fab>
                    </Tooltip>
                    <Box
                        sx={{
                            backgroundColor: "background.default",
                            minHeight: "100%",
                            py: {
                                xs: 2,
                                lg: 4,
                            },
                        }}
                    >
                        <Container maxWidth={false}>
                            <Grid container spacing={3}>
                                <Grid
                                    alignItems="center"
                                    container
                                    justifyContent="space-between"
                                    spacing={3}
                                    item
                                    xs={12}
                                >
                                    <Grid item>
                                        <Box sx={{ display: "flex" }}>
                                            <Box>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="overline"
                                                >
                                                    Overview
                                                </Typography>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h5"
                                                >
                                                    Hello{" "}
                                                    {(() => {
                                                        switch (
                                                            user.displayName
                                                        ) {
                                                            case null:
                                                                return triggerNameModal()
                                                            case user.displayName:
                                                                return user.displayName
                                                                    .split(" ")
                                                                    .slice(
                                                                        0,
                                                                        -1
                                                                    )

                                                            default:
                                                                return null
                                                        }
                                                    })()}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {Company.overview}
                                                </Typography>
                                            </Box>
                                            <Box
                                                className="fade-in-slow-full-opacity"
                                                sx={{
                                                    ml: 5,
                                                    display: {
                                                        xs: "none",
                                                        sm: "flex",
                                                    },
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        mt: -1,
                                                        display: {
                                                            xs: "none",
                                                            sm: "unset",
                                                        },
                                                    }}
                                                >
                                                    {weather ? (
                                                        <img
                                                            src={
                                                                weather?.current
                                                                    .condition
                                                                    .icon
                                                            }
                                                            alt="weather"
                                                            style={{
                                                                width: "85px",
                                                            }}
                                                        />
                                                    ) : null}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: {
                                                            xs: "none",
                                                            sm: "unset",
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="subtitle2"
                                                        mt={-2.5}
                                                    >
                                                        {
                                                            weather?.current
                                                                .condition.text
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box
                                                className="fade-in-slow-full-opacity"
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "flex",
                                                    },
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography
                                                    color="primary"
                                                    variant="h4"
                                                >
                                                    {weather?.current.temp_f &&
                                                        Math.round(
                                                            weather?.current
                                                                .temp_f
                                                        )}
                                                    ˚
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: {
                                                xs: "none",
                                                lg: "unset",
                                            },
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            component={RouterLink}
                                            to="/dashboard/customers/add"
                                            startIcon={
                                                <PlusIcon fontSize="small" />
                                            }
                                            variant="contained"
                                        >
                                            Add A Prospect
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <MonthlyGoal />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <MonthlyTracking />
                                </Grid>
                                <Grid
                                    sx={{
                                        display: {
                                            xs: "none",
                                            md: "unset",
                                        },
                                    }}
                                    item
                                    sm={6}
                                    md={4}
                                    lg={4}
                                >
                                    <MonthlyActual />
                                </Grid>

                                <Grid item xs={12} md={6} lg={6} xl={4}>
                                    <RecentProspects />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={4}>
                                    <OverviewTask />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={4}>
                                    <Important />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={4}>
                                    <RecentPolicies />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={4}>
                                    <RecentTouchPoints />
                                </Grid>
                                <Grid
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "unset",
                                        },
                                    }}
                                    item
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    xl={4}
                                >
                                    <OverviewTotalByType
                                        healthPolicies={healthPolicies}
                                        useLife={useLife}
                                        useDental={useDental}
                                        useVision={useVision}
                                    />
                                </Grid>
                                <Grid
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "unset",
                                        },
                                    }}
                                    item
                                    xs={12}
                                >
                                    <OverviewTotalByCarrier
                                        useAmbetter={useAmbetter}
                                        useCigna={useCigna}
                                        useBright={useBright}
                                        useOscar={useOscar}
                                        useSuncare={useSuncare}
                                        useMolina={useMolina}
                                        useBcbs={useBcbs}
                                        useAvmed={useAvmed}
                                        useUnited={useUnited}
                                        useAetna={useAetna}
                                        useFriday={useFriday}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </>
            )}
            <DisplayNameModal open={open} onClose={handleClose} />
        </>
    )
}

export default Overview
