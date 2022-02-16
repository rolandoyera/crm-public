import type { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"
import { format } from "date-fns"
import { Box, Card, CardActions, CardHeader, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Scrollbar from "../../Scrollbar"

const OverviewTotalByType = ({
    healthPolicies,
    useLife,
    useDental,
    useVision,
    ...props
}) => {
    const theme = useTheme()
    const data = {
        series: [
            {
                name: "policies",
                data: [
                    healthPolicies.length,
                    useLife.type.length,
                    useDental.type.length,
                    useVision.type.length,
                ],
            },
        ],
        categories: ["Health", "Life", "Dental", "Vision"],
    }
    const chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            stacked: true,
            toolbar: {
                show: true,
            },
        },
        colors: ["#43b4ff", "#7783DB", "#7783DB"],
        dataLabels: {
            enabled: false,
        },
        grid: {
            borderColor: theme.palette.divider,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        states: {
            active: {
                filter: {
                    type: "none",
                },
            },
            hover: {
                filter: {
                    type: "none",
                },
            },
        },
        legend: {
            show: false,
        },
        stroke: {
            colors: ["transparent"],
            show: true,
            width: 2,
        },
        theme: {
            mode: theme.palette.mode,
        },
        xaxis: {
            axisBorder: {
                show: true,
            },
            axisTicks: {
                show: true,
            },
            categories: data.categories,
            labels: {
                style: {
                    colors: theme.palette.text.primary,
                },
            },
        },
        yaxis: {
            labels: {
                offsetX: -12,
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
    }

    const chartSeries = data.series

    return (
        <Card {...props}>
            <CardHeader
                subheader={
                    <Typography color="textSecondary" variant="body2">
                        {format(new Date(), "MMM yyyy")}
                    </Typography>
                }
                title="Policies By Type"
            />
            <Scrollbar>
                <Box
                    sx={{
                        height: 379,
                        minWidth: 500,
                        px: 2,
                    }}
                >
                    <Chart
                        height="380"
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                    />
                </Box>
            </Scrollbar>
            <CardActions
                sx={{
                    backgroundColor: "background.default",
                    p: 4.4,
                }}
            ></CardActions>
        </Card>
    )
}

export default OverviewTotalByType
