import type { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"
import { format } from "date-fns"
import { Box, Card, CardHeader, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Scrollbar from "../../Scrollbar"

const OverviewTotalByCarrier = ({
    useAmbetter,
    useCigna,
    useBright,
    useOscar,
    useSuncare,
    useUnited,
    useAetna,
    useFriday,
    useMolina,
    useBcbs,
    useAvmed,
    ...props
}) => {
    const theme = useTheme()

    const data = {
        series: [
            {
                name: "policies",
                data: [
                    useAmbetter.carrier.length,
                    useOscar.carrier.length,
                    useMolina.carrier.length,
                    useBright.carrier.length,
                    useCigna.carrier.length,
                    useBcbs.carrier.length,
                    useAvmed.carrier.length,
                    useAetna.carrier.length,
                    useSuncare.carrier.length,
                    useUnited.carrier.length,
                    useFriday.carrier.length,
                ],
            },
        ],
        categories: [
            "Ambetter",
            "Oscar",
            "Molina",
            "Bright Health",
            "Cigna",
            "BCBS",
            "Avmed",
            "Aetna",
            "Suncare",
            "United",
            "Friday",
        ],
    }
    const chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            stacked: true,
            toolbar: {
                show: true,
            },
        },

        colors: ["#7783DB", "#7783DB", "#7783DB"],
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
                title="Policies By Carrier"
            />
            <Scrollbar>
                <Box
                    sx={{
                        height: 336,
                        minWidth: 500,
                        px: 2,
                    }}
                >
                    <Chart
                        height="300"
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                    />
                </Box>
            </Scrollbar>
        </Card>
    )
}

export default OverviewTotalByCarrier
