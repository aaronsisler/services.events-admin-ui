import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, CLIENTS_PATH, EVENTS_PATH } from "@/lib/constants";
import { Event } from "@/lib/features/event/event";

interface EventEnvelope {
  clientId: string;
  events: Event[];
}

export const eventApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "events",
  tagTypes: ["Event"],
  endpoints: (build) => ({
    getAllEvents: build.query<Event[], string>({
      query: (clientId: string) => `${CLIENTS_PATH}/${clientId}/${EVENTS_PATH}`,
      providesTags: ["Event"],
    }),
    postEvents: build.mutation<Event[], Partial<EventEnvelope>>({
      query: ({ clientId, events }) => ({
        url: `${CLIENTS_PATH}/${clientId}/${EVENTS_PATH}`,
        method: "POST",
        body: events,
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const { useGetAllEventsQuery, usePostEventsMutation } = eventApiSlice;
