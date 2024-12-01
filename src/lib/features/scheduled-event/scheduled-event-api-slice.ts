import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  BASE_URL,
  EVENT_SCHEDULES_PATH,
  SCHEDULED_EVENTS_PATH,
} from "@/lib/constants";
import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";

interface ScheduledEventsEnvelope {
  eventScheduleId: string;
  scheduledEvents: ScheduledEvent[];
}

interface ScheduledEventEnvelope {
  eventScheduleId: string;
  scheduledEvent: ScheduledEvent;
}

export const scheduledEventApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "scheduledEventApi",
  tagTypes: ["Scheduled Event"],
  endpoints: (build) => ({
    getAllScheduledEvents: build.query<ScheduledEvent[], string>({
      query: (eventScheduleId: string) =>
        `${EVENT_SCHEDULES_PATH}/${eventScheduleId}/${SCHEDULED_EVENTS_PATH}`,
      providesTags: ["Scheduled Event"],
    }),
    postScheduledEvents: build.mutation<
      ScheduledEvent[],
      Partial<ScheduledEventsEnvelope>
    >({
      query: ({ eventScheduleId, scheduledEvents }) => ({
        url: `${EVENT_SCHEDULES_PATH}/${eventScheduleId}/${SCHEDULED_EVENTS_PATH}`,
        method: "POST",
        body: scheduledEvents,
      }),
      invalidatesTags: ["Scheduled Event"],
    }),
    putScheduledEvent: build.mutation<
      ScheduledEvent[],
      Partial<ScheduledEventEnvelope>
    >({
      query: ({ eventScheduleId, scheduledEvent }) => ({
        url: `${EVENT_SCHEDULES_PATH}/${eventScheduleId}/${SCHEDULED_EVENTS_PATH}/${scheduledEvent?.scheduledEventId}`,
        method: "PUT",
        body: scheduledEvent,
      }),
      invalidatesTags: ["Scheduled Event"],
    }),
  }),
});

export const {
  useGetAllScheduledEventsQuery,
  usePostScheduledEventsMutation,
  usePutScheduledEventMutation,
} = scheduledEventApiSlice;
