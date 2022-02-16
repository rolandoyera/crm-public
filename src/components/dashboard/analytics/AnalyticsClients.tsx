import { useState } from "react"
import type { FC } from "react"
import type { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"
import {
    Box,
    Card,
    CardHeader,
    Checkbox,
    Tooltip,
    Typography,
} from "@mui/material"
import type { CardProps } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import InformationCircleIcon from "../../../icons/InformationCircle"

const AnalyticsTrafficSources: FC<CardProps> = (props) => {
    const theme = useTheme()
    const [selectedSeries, setSelectedSeries] = useState([
        "Clients",
        "Prospects",
    ])

    const handleChange = (event, name: string) => {
        if (!event.target.checked) {
            setSelectedSeries(selectedSeries.filter((item) => item !== name))
        } else {
            setSelectedSeries([...selectedSeries, name])
        }
    }
    const data = {
        series: [
            {
                color: "#4CAF50",
                data: [2, 3, 4],
                name: "Clients",
            },
            {
                color: "#FF9800",
                data: [3, 4, 6, 4, 1, 1, 2, 3, 3, 1, 2, 5, 0],
                name: "Prospects",
            },
            // {
            //     color: "#F44336",
            //     data: [1, 1, 0, 3, 2, 4, 3, 2, 1, 6, 0, 3, 2],
            //     name: "Lost",
            // },
        ],
        xaxis: {
            dataPoints: ["Jan"],
        },
    }

    const chartSeries = data.series.filter((item) =>
        selectedSeries.includes(item.name)
    )

    const chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        colors: chartSeries.map((item) => item.color),
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
        legend: {
            show: true,
        },
        markers: {
            hover: {
                size: undefined,
                sizeOffset: 2,
            },
            radius: 2,
            shape: "circle",
            size: 4,
            strokeWidth: 0,
        },
        stroke: {
            curve: "smooth",
            lineCap: "butt",
            width: 3,
        },
        theme: {
            mode: theme.palette.mode,
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true,
            },
            categories: data.xaxis.dataPoints,
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
        yaxis: [
            {
                axisBorder: {
                    color: theme.palette.divider,
                    show: true,
                },
                axisTicks: {
                    color: theme.palette.divider,
                    show: true,
                },
                labels: {
                    style: {
                        colors: theme.palette.text.secondary,
                    },
                },
            },
            {
                axisTicks: {
                    color: theme.palette.divider,
                    show: true,
                },
                axisBorder: {
                    color: theme.palette.divider,
                    show: true,
                },
                labels: {
                    style: {
                        colors: theme.palette.text.secondary,
                    },
                },
                opposite: true,
            },
        ],
    }

    return (
        <Card {...props}>
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
                            Clients
                        </Typography>
                        <Tooltip title="Widget25 Source by channel">
                            <InformationCircleIcon fontSize="small" />
                        </Tooltip>
                    </Box>
                }
            />
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexWrap: "wrap",
                    px: 2,
                }}
            >
                {data.series.map((item) => (
                    <Box
                        key={item.name}
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            mr: 2,
                        }}
                    >
                        <Checkbox
                            checked={selectedSeries.some(
                                (visibleItem) => visibleItem === item.name
                            )}
                            color="primary"
                            onChange={(event) => handleChange(event, item.name)}
                        />
                        <Box
                            sx={{
                                backgroundColor: item.color,
                                borderRadius: "50%",
                                height: 8,
                                ml: 1,
                                mr: 2,
                                width: 8,
                            }}
                        />
                        <Typography color="textPrimary" variant="subtitle2">
                            {item.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Chart
                height="393"
                options={chartOptions}
                series={chartSeries}
                type="line"
            />
        </Card>
    )
}

export default AnalyticsTrafficSources
