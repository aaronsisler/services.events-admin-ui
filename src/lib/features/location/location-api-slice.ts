import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL, CLIENTS_PATH, LOCATIONS_PATH } from "@/lib/constants";
import { Location } from "@/lib/features/location/location";

interface LocationEnvelope {
  clientId: string;
  locations: Location[];
}

export const locationApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/` }),
  reducerPath: "locationApi",
  tagTypes: ["Location"],
  endpoints: (build) => ({
    getAllLocations: build.query<Location[], string>({
      query: (clientId: string) =>
        `${CLIENTS_PATH}/${clientId}/${LOCATIONS_PATH}`,
      providesTags: ["Location"],
    }),
    postLocations: build.mutation<Location[], Partial<LocationEnvelope>>({
      query: ({ clientId, locations }) => ({
        url: `${CLIENTS_PATH}/${clientId}/${LOCATIONS_PATH}`,
        method: "POST",
        body: locations,
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const { useGetAllLocationsQuery, usePostLocationsMutation } =
  locationApiSlice;
