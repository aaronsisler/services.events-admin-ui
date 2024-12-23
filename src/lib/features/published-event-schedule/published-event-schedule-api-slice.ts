import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  API_BASE_URL,
  CLIENTS_PATH,
  PUBLISHED_EVENT_SCHEDULES_PATH,
} from "@/lib/constants";
import { PublishedEventSchedule } from "./published-event-schedule";

interface PublishedEventScheduleEnvelope {
  clientId: string;
  publishedEventSchedule: PublishedEventSchedule;
}

export const publishedEventScheduleApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/` }),
  reducerPath: "publishedEventScheduleApi",
  tagTypes: ["Published Event Schedule"],
  endpoints: (build) => ({
    getAllPublishedEventSchedules: build.query<
      PublishedEventSchedule[],
      string
    >({
      query: (clientId: string) =>
        `${CLIENTS_PATH}/${clientId}/${PUBLISHED_EVENT_SCHEDULES_PATH}`,
      providesTags: ["Published Event Schedule"],
    }),
    postPublishedEventSchedule: build.mutation<
      PublishedEventSchedule,
      Partial<PublishedEventScheduleEnvelope>
    >({
      query: ({ clientId, publishedEventSchedule }) => ({
        url: `${CLIENTS_PATH}/${clientId}/${PUBLISHED_EVENT_SCHEDULES_PATH}`,
        method: "POST",
        body: publishedEventSchedule,
      }),
      invalidatesTags: ["Published Event Schedule"],
    }),
  }),
});

export const {
  useGetAllPublishedEventSchedulesQuery,
  usePostPublishedEventScheduleMutation,
} = publishedEventScheduleApiSlice;
