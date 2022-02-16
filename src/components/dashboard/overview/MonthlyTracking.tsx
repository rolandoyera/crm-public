import { FC } from "react"
import { Box, Card, CardContent, Typography } from "@mui/material"
import type { ApexOptions } from "apexcharts"
import { useTheme } from "@mui/material/styles"
import Chart from "react-apexcharts"
import { useGetAllPoliciesByCurrentMonth } from "lib/usePolicies"

const LineChart: FC = () => {
    const theme = useTheme()

    const chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: ["#7783DB"],
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        stroke: {
            width: 3,
        },
        theme: {
            mode: theme.palette.mode,
        },
        tooltip: {
            enabled: false,
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
    }

    const chartSeries = [{ data: [0, 60, 30, 60, 0, 30, 10, 30, 0] }]

    return (
        <Box
            sx={{
                display: {
                    xs: "none",
                    sm: "unset",
                },
            }}
        >
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="line"
                width={120}
            />
        </Box>
    )
}

const MonthlyTracking: FC = (props) => {
    const { policies } = useGetAllPoliciesByCurrentMonth("policies")
    const d = new Date()
    let day = d.getDate()
    const getDaysInMonth = (date) =>
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const tracking = (policies.length / day) * getDaysInMonth(new Date())
    const setTracking = Math.round(tracking)

    return (
        <Card {...props}>
            <CardContent
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: {
                        xs: "96px",
                        sm: "170px",
                    },
                    pt: {
                        xs: 3.5,
                        sm: 0.5,
                    },
                }}
            >
                <LineChart />
                <Typography color="textPrimary" variant="subtitle2" mb={1}>
                    Tracking In Policies
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <Typography color="textPrimary" variant="h2" pb={0}>
                        {setTracking}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default MonthlyTracking
