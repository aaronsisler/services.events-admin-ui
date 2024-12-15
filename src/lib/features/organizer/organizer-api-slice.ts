import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, CLIENTS_PATH, ORGANIZERS_PATH } from "@/lib/constants";
import { Organizer } from "@/lib/features/organizer/organizer";

interface OrganizerEnvelope {
  clientId: string;
  organizers: Organizer[];
}

export const organizerApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "organizerApi",
  tagTypes: ["Organizer"],
  endpoints: (build) => ({
    getAllOrganizers: build.query<Organizer[], string>({
      query: (clientId: string) =>
        `${CLIENTS_PATH}/${clientId}/${ORGANIZERS_PATH}`,
      providesTags: ["Organizer"],
    }),
    postOrganizers: build.mutation<Organizer[], Partial<OrganizerEnvelope>>({
      query: ({ clientId, organizers }) => ({
        url: `${CLIENTS_PATH}/${clientId}/${ORGANIZERS_PATH}`,
        method: "POST",
        body: organizers,
      }),
      invalidatesTags: ["Organizer"],
    }),
  }),
});

export const { useGetAllOrganizersQuery, usePostOrganizersMutation } =
  organizerApiSlice;
