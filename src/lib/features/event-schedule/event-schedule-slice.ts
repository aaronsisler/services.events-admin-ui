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
  name: "eventSchedule",
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
    updateScheduledEvent(state: EventScheduleState, action) {
      const {
        index,
        scheduledEvent,
      }: { index: number; scheduledEvent: ScheduledEvent } = action.payload;

      if (!!state.scheduledEvents[index]) {
        state.scheduledEvents[index] = {
          ...scheduledEvent,
          scheduledEventInterval: !!scheduledEvent.scheduledEventInterval
            ? scheduledEvent.scheduledEventInterval
            : undefined,
          scheduledEventDay: !!scheduledEvent.scheduledEventDay
            ? scheduledEvent.scheduledEventDay
            : undefined,
          scheduledEventDate: !!scheduledEvent.scheduledEventDate
            ? scheduledEvent.scheduledEventDate
            : undefined,
          cost: !!scheduledEvent.cost ? scheduledEvent.cost : undefined,
        };
      }
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
  },
});

export const {
  addScheduledEvent,
  clearEventScheduleId,
  clearScheduledEvents,
  removeScheduledEvent,
  setEventScheduleId,
  updateScheduledEvent,
} = eventScheduleSlice.actions;

export const eventSchedulesReducer = eventScheduleSlice.reducer;

export const { getEventScheduleId, getScheduledEvents } =
  eventScheduleSlice.selectors;
