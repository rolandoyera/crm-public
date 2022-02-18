import type { FC } from "react"
import type { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Tooltip,
    Typography,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import ArrowRightIcon from "../../../icons/ArrowRight"
import InformationCircleIcon from "../../../icons/InformationCircle"

const AnalyticsProspectSources: FC = () => {
    const theme = useTheme()

    const chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        colors: [
            "rgba(86, 100, 210, 0.5)",
            "#FFB547",
            "#77df7a",
            "#64B6F7",
            "#89a9b8",
        ],
        dataLabels: {
            enabled: false,
        },
        labels: ["Website", "Facebook", "healthcare.gov", "Referral", "Other"],
        legend: {
            fontSize: "14px",
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.subtitle2.fontWeight,
            itemMargin: {
                vertical: 8,
            },
            labels: {
                colors: theme.palette.text.primary,
            },
            markers: {
                width: 8,
                height: 8,
            },
            show: true,
        },
        stroke: {
            width: 0,
        },
        theme: {
            mode: theme.palette.mode,
        },
    }

    const chartSeries = [24, 6, 20, 4, 2]

    return (
        <Card>
            <CardHeader
                disableTypography
                title={
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography color="textPrimary" variant="h6">
                            Prospect Sources: 90 Days
                        </Typography>
                        <Tooltip title="Top 5 prospect acquisition sources">
                            <InformationCircleIcon fontSize="small" />
                        </Tooltip>
                    </Box>
                }
            />
            <CardContent>
                <Chart
                    height={300}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                />
            </CardContent>
            <CardActions
                sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: "background.default",
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    variant="text"
                >
                    See all visits
                </Button>
            </CardActions>
        </Card>
    )
}

export default AnalyticsProspectSources
