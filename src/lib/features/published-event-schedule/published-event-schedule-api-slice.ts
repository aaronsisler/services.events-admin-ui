import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  BASE_URL,
  CLIENTS_PATH,
  PUBLISHED_EVENT_SCHEDULES_PATH,
} from "@/lib/constants";
import { PublishedEventSchedule } from "./published-event-schedule";

interface PublishedEventScheduleEnvelope {
  clientId: string;
  publishedEventSchedules: PublishedEventSchedule[];
}

export const publishedEventScheduleApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
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
    postPublishedEventSchedules: build.mutation<
      PublishedEventSchedule[],
      Partial<PublishedEventScheduleEnvelope>
    >({
      query: ({ clientId, publishedEventSchedules }) => ({
        url: `${CLIENTS_PATH}/${clientId}/${PUBLISHED_EVENT_SCHEDULES_PATH}`,
        method: "POST",
        body: publishedEventSchedules,
      }),
      invalidatesTags: ["Published Event Schedule"],
    }),
  }),
});

export const {
  useGetAllPublishedEventSchedulesQuery,
  usePostPublishedEventSchedulesMutation,
} = publishedEventScheduleApiSlice;
