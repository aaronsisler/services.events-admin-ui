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
    addScheduledEvent(state: EventScheduleState, action) {
      return {
        ...state,
        scheduledEvents: state.scheduledEvents.concat(action.payload),
      };
    },
    clearScheduledEvents(state: EventScheduleState) {
      return { ...state, scheduledEvents: [] };
    },
    /**
     * The action's payload is of type: Scheduled Event.
     * If the scheduledEventId matches an existing record, it replaces that record.
     * If not, it will append the record to the end of the existing array.
     * @param state
     * @param action
     */
    upsertScheduledEvent(state: EventScheduleState, action) {
      const { payload: scheduledEvent } = action;
      const itemIndex = state.scheduledEvents.findIndex(
        (item) => item.scheduledEventId === scheduledEvent.scheduledEventId
      );

      // // If the item isn't in the array, add it to the end
      if (itemIndex < 0) {
        return {
          ...state,
          scheduledEvents: state.scheduledEvents.concat(scheduledEvent),
        };
      }

      // If the item is in the array, replace the item in the array
      return {
        ...state,
        scheduledEvents: [
          ...state.scheduledEvents.slice(0, itemIndex),
          scheduledEvent,
          ...state.scheduledEvents.slice(itemIndex + 1),
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

export const {} = eventScheduleSlice.actions;

export const eventSchedulesReducer = eventScheduleSlice.reducer;

export const { getEventScheduleId } = eventScheduleSlice.selectors;
