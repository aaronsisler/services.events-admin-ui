// Need to use the React-specific entry point to import `createApi`
import { createSlice } from "@reduxjs/toolkit";
import { PublishedEventSchedule } from "./published-event-schedule";

const initialState: PublishedEventSchedule = {
  clientId: "",
  eventScheduleId: "",
  name: "",
  targetYear: 1900,
  targetMonth: 0,
};

export const publishedEventScheduleSlice = createSlice({
  name: "publishedEventSchedule",
  initialState,
  reducers: {
    updatePublishedEventSchedule(state: PublishedEventSchedule, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updatePublishedEventSchedule } =
  publishedEventScheduleSlice.actions;

export const publishedEventSchedulesReducer =
  publishedEventScheduleSlice.reducer;
