import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { calendarApi } from "../__fakeApi__/calendarApi"
import type { AppThunk } from "../store"
import type { CalendarEvent } from "../types/calendar"

interface CalendarState {
    events: CalendarEvent[]
    isModalOpen: boolean
    selectedEventId: string | null
    selectedRange: {
        start: number
        end: number
    } | null
}

const initialState: CalendarState = {
    events: [],
    isModalOpen: false,
    selectedEventId: null,
    selectedRange: null,
}

const slice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        getEvents(
            state: CalendarState,
            action: PayloadAction<CalendarEvent[]>
        ): void {
            state.events = action.payload
        },
        createEvent(
            state: CalendarState,
            action: PayloadAction<CalendarEvent>
        ): void {
            state.events.push(action.payload)
        },
        selectEvent(state: CalendarState, action: PayloadAction<string>): void {
            state.isModalOpen = true
            state.selectedEventId = action.payload
        },
        updateEvent(
            state: CalendarState,
            action: PayloadAction<CalendarEvent>
        ): void {
            const event = action.payload

            state.events = state.events.map((_event) => {
                if (_event.id === event.id) {
                    return event
                }

                return _event
            })
        },
        deleteEvent(state: CalendarState, action: PayloadAction<string>): void {
            state.events = state.events.filter(
                (event) => event.id !== action.payload
            )
        },
        selectRange(
            state: CalendarState,
            action: PayloadAction<{ start: number; end: number }>
        ): void {
            const { start, end } = action.payload

            state.isModalOpen = true
            state.selectedRange = {
                start,
                end,
            }
        },
        openModal(state: CalendarState): void {
            state.isModalOpen = true
        },
        closeModal(state: CalendarState): void {
            state.isModalOpen = false
            state.selectedEventId = null
            state.selectedRange = null
        },
    },
})

export const { reducer } = slice

export const getEvents =
    (): AppThunk =>
    async (dispatch): Promise<void> => {
        const data = await calendarApi.getEvents()

        dispatch(slice.actions.getEvents(data))
    }

export const createEvent =
    (createData): AppThunk =>
    async (dispatch): Promise<void> => {
        const data = await calendarApi.createEvent(createData)

        dispatch(slice.actions.createEvent(data))
    }

export const selectEvent =
    (eventId?: string): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(slice.actions.selectEvent(eventId))
    }

export const updateEvent =
    (eventId: string, update: any): AppThunk =>
    async (dispatch): Promise<void> => {
        const data = await calendarApi.updateEvent({
            eventId,
            update,
        })

        dispatch(slice.actions.updateEvent(data))
    }

export const deleteEvent =
    (eventId: string): AppThunk =>
    async (dispatch): Promise<void> => {
        await calendarApi.deleteEvent(eventId)

        dispatch(slice.actions.deleteEvent(eventId))
    }

export const selectRange =
    (start: number, end: number): AppThunk =>
    (dispatch): void => {
        dispatch(slice.actions.selectRange({ start, end }))
    }

export const openModal =
    (): AppThunk =>
    (dispatch): void => {
        dispatch(slice.actions.openModal())
    }

export const closeModal =
    (): AppThunk =>
    (dispatch): void => {
        dispatch(slice.actions.closeModal())
    }

export default slice
