// Need to use the React-specific entry point to import `createApi`
import { createSlice } from "@reduxjs/toolkit";

import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";

export interface EventScheduleState {
  eventScheduleId: string;
  scheduledEvents: ScheduledEvent[];
}

const initialState: EventScheduleState = {
  eventScheduleId: "",
  scheduledEvents: [],
};

export const eventScheduleSlice = createSlice({
  name: "eventSchedules",
  initialState,
  reducers: {
    setEventScheduleId(state: EventScheduleState, action) {
      return { ...state, eventScheduleId: action.payload };
    },
    clearEventScheduleId(state: EventScheduleState) {
      return { ...state, eventScheduleId: "" };
    },
    clearScheduledEvents(state: EventScheduleState) {
      return { ...state, scheduledEvents: [] };
    },
    addScheduledEvent(state: EventScheduleState, action) {
      const { payload: scheduledEvent } = action;

      return {
        ...state,
        scheduledEvents: state.scheduledEvents.concat(scheduledEvent),
      };
    },
    removeScheduledEvent(state: EventScheduleState, action) {
      const { payload: indexToRemove } = action;

      return {
        ...state,
        scheduledEvents: [
          ...state.scheduledEvents.slice(0, indexToRemove),
          ...state.scheduledEvents.slice(indexToRemove + 1),
        ],
      };
    },
  },
  selectors: {
    getEventScheduleId: (state: EventScheduleState) => state.eventScheduleId,
    getScheduledEvents: (state: EventScheduleState) => state.scheduledEvents,
    getScheduledEvent: (state: EventScheduleState, scheduledEventId: string) =>
      eventScheduleSlice
        .getSelectors()
        .getScheduledEvents(state)
        .find(
          (scheduledEvent) =>
            scheduledEvent.scheduledEventId == scheduledEventId
        ),
  },
});

export const {
  addScheduledEvent,
  clearEventScheduleId,
  clearScheduledEvents,
  removeScheduledEvent,
  setEventScheduleId,
} = eventScheduleSlice.actions;

export const eventSchedulesReducer = eventScheduleSlice.reducer;

export const { getEventScheduleId, getScheduledEvents, getScheduledEvent } =
  eventScheduleSlice.selectors;
