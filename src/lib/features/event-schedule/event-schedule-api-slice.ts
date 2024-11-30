import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, CLIENTS_PATH, EVENT_SCHEDULES_PATH } from "@/lib/constants";
import { EventSchedule } from "@/lib/features/event-schedule/event-schedule";

interface EventScheduleEnvelope {
  clientId: string;
  eventSchedules: EventSchedule[];
}

export const eventScheduleApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "eventSchedules",
  tagTypes: ["Event Schedule"],
  endpoints: (build) => ({
    getAllEventSchedules: build.query<EventSchedule[], string>({
      query: (clientId: string) =>
        `${CLIENTS_PATH}/${clientId}/${EVENT_SCHEDULES_PATH}`,
      providesTags: ["Event Schedule"],
    }),
    postEventSchedules: build.mutation<
      EventSchedule[],
      Partial<EventScheduleEnvelope>
    >({
      query: ({ clientId, eventSchedules }) => ({
        url: `${CLIENTS_PATH}/${clientId}/${EVENT_SCHEDULES_PATH}`,
        method: "POST",
        body: eventSchedules,
      }),
      invalidatesTags: ["Event Schedule"],
    }),
  }),
});

export const { useGetAllEventSchedulesQuery, usePostEventSchedulesMutation } =
  eventScheduleApiSlice;
