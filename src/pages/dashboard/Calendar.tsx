import { useState, useRef, useEffect } from "react"
import type { FC } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import timeGridPlugin from "@fullcalendar/timegrid"
import timelinePlugin from "@fullcalendar/timeline"
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    Container,
    Dialog,
    Grid,
    Link,
    Typography,
} from "@mui/material"
import type { Theme } from "@mui/material"
import { alpha, experimentalStyled } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import {
    CalendarEventForm,
    CalendarToolbar,
} from "../../components/dashboard/calendar"
import ChevronRightIcon from "../../icons/ChevronRight"
import PlusIcon from "../../icons/Plus"
import {
    closeModal,
    getEvents,
    openModal,
    selectEvent,
    selectRange,
    updateEvent,
} from "../../slices/calendar"
import { useDispatch, useSelector } from "../../store"
import type { RootState } from "../../store"
import type { CalendarEvent, CalendarView } from "../../types/calendar"
import { CRM } from "lib/constants"
import { useGetCalendar } from "lib/useFirestore"

const selectedEventSelector = (state: RootState): CalendarEvent | null => {
    const { events, selectedEventId } = state.calendar

    if (selectedEventId) {
        return events.find((_event) => _event.id === selectedEventId)
    }

    return null
}

const FullCalendarWrapper = experimentalStyled("div")(({ theme }) => ({
    "& .fc-license-message": {
        display: "none",
    },
    "& .fc": {
        "--fc-bg-event-opacity": 1,
        "--fc-border-color": theme.palette.divider,
        "--fc-daygrid-event-dot-width": "10px",
        "--fc-event-text-color": theme.palette.text.primary,
        "--fc-list-event-hover-bg-color": theme.palette.background.default,
        "--fc-neutral-bg-color": theme.palette.background.default,
        "--fc-page-bg-color": theme.palette.background.default,
        "--fc-today-bg-color": alpha(theme.palette.primary.main, 0.25),
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
    },
    "& .fc .fc-col-header-cell-cushion": {
        paddingBottom: "10px",
        paddingTop: "10px",
    },
    "& .fc .fc-day-other .fc-daygrid-day-top": {
        color: theme.palette.text.secondary,
    },
    "& .fc-daygrid-event": {
        padding: "10px",
    },
}))

const Calendar: FC = () => {
    const dispatch = useDispatch()
    const { events } = useGetCalendar()
    const calendarRef = useRef<FullCalendar | null>(null)
    const mobileDevice = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    )
    const { isModalOpen, selectedRange } = useSelector(
        (state) => state.calendar
    )
    const selectedEvent = useSelector(selectedEventSelector)
    const [date, setDate] = useState<Date>(new Date())
    const [view, setView] = useState<CalendarView>(
        mobileDevice ? "listWeek" : "dayGridMonth"
    )

    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])

    useEffect(() => {
        const calendarEl = calendarRef.current

        if (calendarEl) {
            const calendarApi = calendarEl.getApi()
            const newView = mobileDevice ? "listWeek" : "dayGridMonth"

            calendarApi.changeView(newView)
            setView(newView)
        }
    }, [mobileDevice])

    const handleDateToday = (): void => {
        const calendarEl = calendarRef.current

        if (calendarEl) {
            const calendarApi = calendarEl.getApi()

            calendarApi.today()
            setDate(calendarApi.getDate())
        }
    }

    const handleViewChange = (newView: CalendarView): void => {
        const calendarEl = calendarRef.current

        if (calendarEl) {
            const calendarApi = calendarEl.getApi()

            calendarApi.changeView(newView)
            setView(newView)
        }
    }

    const handleDatePrev = (): void => {
        const calendarEl = calendarRef.current

        if (calendarEl) {
            const calendarApi = calendarEl.getApi()

            calendarApi.prev()
            setDate(calendarApi.getDate())
        }
    }

    const handleDateNext = (): void => {
        const calendarEl = calendarRef.current

        if (calendarEl) {
            const calendarApi = calendarEl.getApi()

            calendarApi.next()
            setDate(calendarApi.getDate())
        }
    }

    const handleAddClick = (): void => {
        dispatch(openModal())
    }

    const handleRangeSelect = (arg: any): void => {
        const calendarEl = calendarRef.current

        if (calendarEl) {
            const calendarApi = calendarEl.getApi()

            calendarApi.unselect()
        }

        dispatch(selectRange(arg.start.getTime(), arg.end.getTime()))
    }

    const handleEventSelect = (arg: any): void => {
        dispatch(selectEvent(arg.event.id))
        console.log(arg.event)
    }

    const handleEventResize = async ({ event }: any): Promise<void> => {
        try {
            await dispatch(
                updateEvent(event.id, {
                    allDay: event.allDay,
                    start: event.start,
                    end: event.end,
                })
            )
        } catch (err) {
            console.error(err)
        }
    }

    const handleEventDrop = async ({ event }: any): Promise<void> => {
        try {
            await dispatch(
                updateEvent(event.id, {
                    allDay: event.allDay,
                    start: event.start,
                    end: event.end,
                })
            )
        } catch (err) {
            console.error(err)
        }
    }

    const handleModalClose = (): void => {
        dispatch(closeModal())
    }

    return (
        <>
            <Helmet>
                <title>Dashboard: Calendar | {CRM.name}</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item>
                            <Typography color="textPrimary" variant="h5">
                                Here&apos;s what you planned
                            </Typography>
                            <Breadcrumbs
                                aria-label="breadcrumb"
                                separator={
                                    <ChevronRightIcon fontSize="small" />
                                }
                                sx={{ mt: 1 }}
                            >
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="/dashboard"
                                    variant="subtitle2"
                                >
                                    Dashboard
                                </Link>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Calendar
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item>
                            <Box sx={{ m: -1 }}>
                                <Button
                                    color="primary"
                                    onClick={handleAddClick}
                                    startIcon={<PlusIcon fontSize="small" />}
                                    sx={{ m: 1 }}
                                    variant="contained"
                                >
                                    New Event
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <CalendarToolbar
                            date={date}
                            onDateNext={handleDateNext}
                            onDatePrev={handleDatePrev}
                            onDateToday={handleDateToday}
                            onViewChange={handleViewChange}
                            view={view}
                        />
                    </Box>
                    <Card
                        sx={{
                            mt: 3,
                            p: 2,
                        }}
                    >
                        <FullCalendarWrapper>
                            <FullCalendar
                                allDayMaintainDuration
                                dayMaxEventRows={3}
                                droppable
                                editable
                                eventClick={handleEventSelect}
                                eventDisplay="block"
                                eventDrop={handleEventDrop}
                                eventResizableFromStart
                                eventResize={handleEventResize}
                                events={events}
                                headerToolbar={false}
                                height={800}
                                initialDate={date}
                                initialView={view}
                                plugins={[
                                    dayGridPlugin,
                                    interactionPlugin,
                                    listPlugin,
                                    timeGridPlugin,
                                    timelinePlugin,
                                ]}
                                ref={calendarRef}
                                rerenderDelay={10}
                                select={handleRangeSelect}
                                selectable
                                weekends
                            />
                        </FullCalendarWrapper>
                    </Card>
                    <Dialog
                        fullWidth
                        maxWidth="sm"
                        onClose={handleModalClose}
                        open={isModalOpen}
                    >
                        {/* Dialog renders its body even if not open */}
                        {isModalOpen && (
                            <CalendarEventForm
                                event={selectedEvent}
                                handleModalClose={handleModalClose}
                                onCancel={handleModalClose}
                                range={selectedRange}
                            />
                        )}
                    </Dialog>
                </Container>
            </Box>
        </>
    )
}

export default Calendar
