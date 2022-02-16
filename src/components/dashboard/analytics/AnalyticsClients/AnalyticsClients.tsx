import { useCallback, useEffect, useState } from "react"
import type { FC } from "react"
import type { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"
import { Box, Card, CardHeader, Tooltip, Typography } from "@mui/material"
import { experimentalStyled } from "@mui/material/styles"
import type { CardProps } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import InformationCircleIcon from "icons/InformationCircle"
import {
    today,
    minusOneWeek,
    minusTwoWeeks,
    minusThreeWeeks,
    minusFourWeeks,
    minusFiveWeeks,
    minusSixWeeks,
    minusSevenWeeks,
    minusEightWeeks,
    minusNineWeeks,
    minusTenWeeks,
    minusElevenWeeks,
    minusTwelveWeeks,
    minusThirteenWeeks,
    minusFourteenWeeks,
} from "./GetWeeksData"
import useMounted from "hooks/useMounted"
import { fireDb } from "lib/firebase"
import * as Catagory from "./GetWeeksChart"

const ChartRoot = experimentalStyled("div")(({ theme }) => ({
    "& .apexcharts-toolbar": {
        right: "22px !important",
        top: "-35px !important",
        color: "red",
    },
}))

const AnalyticsClients: FC<CardProps> = (props) => {
    const theme = useTheme()
    const mounted = useMounted()
    const [clients, setClients] = useState([])

    const getData = useCallback(async () => {
        try {
            await fireDb
                .collection("customers")
                .orderBy("createdAt")
                .where("isCustomer", "==", true)
                .onSnapshot((snap) => {
                    const documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    })
                    if (mounted.current) {
                        setClients(documents)
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }, [mounted])

    useEffect(() => {
        getData()
    }, [getData])

    const todayParsed = Date.parse(today)
    const minusOneWeekParsed = Date.parse(minusOneWeek)
    const minusTwoWeeksParsed = Date.parse(minusTwoWeeks)
    const minusThreeWeeksParsed = Date.parse(minusThreeWeeks)
    const minusFourWeeksParsed = Date.parse(minusFourWeeks)
    const minusFiveWeeksParsed = Date.parse(minusFiveWeeks)
    const minusSixWeeksParsed = Date.parse(minusSixWeeks)
    const minusSevenWeeksParsed = Date.parse(minusSevenWeeks)
    const minusEightWeeksParsed = Date.parse(minusEightWeeks)
    const minusNineWeeksParsed = Date.parse(minusNineWeeks)
    const minusTenWeeksParsed = Date.parse(minusTenWeeks)
    const minusElevenWeeksParsed = Date.parse(minusElevenWeeks)
    const minusTwelveWeeksParsed = Date.parse(minusTwelveWeeks)
    const minusThirteenWeeksParsed = Date.parse(minusThirteenWeeks)
    const minusFourteenWeeksParsed = Date.parse(minusFourteenWeeks)

    const useWeeks = (start, end) => {
        return clients.filter((x) => {
            return (
                Date.parse(x.createdAt.toDate()) >= end &&
                Date.parse(x.createdAt.toDate()) <= start
            )
        })
    }

    const week0 = useWeeks(todayParsed, minusOneWeekParsed)
    const week1 = useWeeks(minusOneWeekParsed, minusTwoWeeksParsed)
    const week2 = useWeeks(minusTwoWeeksParsed, minusThreeWeeksParsed)
    const week3 = useWeeks(minusThreeWeeksParsed, minusFourWeeksParsed)
    const week4 = useWeeks(minusFourWeeksParsed, minusFiveWeeksParsed)
    const week5 = useWeeks(minusFiveWeeksParsed, minusSixWeeksParsed)
    const week6 = useWeeks(minusSixWeeksParsed, minusSevenWeeksParsed)
    const week7 = useWeeks(minusSevenWeeksParsed, minusEightWeeksParsed)
    const week8 = useWeeks(minusEightWeeksParsed, minusNineWeeksParsed)
    const week9 = useWeeks(minusNineWeeksParsed, minusTenWeeksParsed)
    const week10 = useWeeks(minusTenWeeksParsed, minusElevenWeeksParsed)
    const week11 = useWeeks(minusElevenWeeksParsed, minusTwelveWeeksParsed)
    const week12 = useWeeks(minusTwelveWeeksParsed, minusThirteenWeeksParsed)
    const week13 = useWeeks(minusThirteenWeeksParsed, minusFourteenWeeksParsed)
    const series = [
        {
            name: "Clients",
            color: "#4CAF50",
            data: [
                week13.length,
                week12.length,
                week11.length,
                week10.length,
                week9.length,
                week8.length,
                week7.length,
                week6.length,
                week5.length,
                week4.length,
                week3.length,
                week2.length,
                week1.length,
                week0.length,
            ],
        },
    ]
    const options: ApexOptions = {
        chart: {
            background: "transparent",
            stacked: false,
            toolbar: {
                show: true,
            },
        },
        fill: {
            type: "solid",
            opacity: 1,
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
        stroke: {
            curve: "straight",
            lineCap: "butt",
            width: 3,
        },
        theme: {
            mode: theme.palette.mode,
        },
        legend: {
            show: true,
        },
        markers: {
            hover: {
                size: undefined,
                sizeOffset: 4,
            },
            radius: 2,
            shape: "circle",
            size: 6,
            strokeWidth: 1,
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true,
            },
            categories: [
                Catagory.minusThirteenWeeks,
                Catagory.minusTwelveWeeks,
                Catagory.minusElevenWeeks,
                Catagory.minusTenWeeks,
                Catagory.minusNineWeeks,
                Catagory.minusEightWeeks,
                Catagory.minusSevenWeeks,
                Catagory.minusSixWeeks,
                Catagory.minusFiveWeeks,
                Catagory.minusFourWeeks,
                Catagory.minusThreeWeeks,
                Catagory.minusTwoWeeks,
                Catagory.minusOneWeek,
                Catagory.today,
            ],
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
    }
    return (
        <Card {...props} sx={{ pl: 2, pr: 1 }}>
            <CardHeader
                disableTypography
                title={
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <Typography color="textPrimary" variant="h6" mr={1}>
                            Clients: 90 Days
                        </Typography>
                        <Tooltip
                            title="Client acquisition over the past 90 days"
                            sx={{ mt: -2, width: ".9em" }}
                        >
                            <InformationCircleIcon fontSize="small" />
                        </Tooltip>
                    </Box>
                }
            />
            <ChartRoot>
                <Chart
                    height="393"
                    type="line"
                    series={series}
                    options={options}
                />
            </ChartRoot>
        </Card>
    )
}

export default AnalyticsClients
