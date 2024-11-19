// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, CLIENTS_PATH, LOCATIONS_PATH } from "@/app/constants";
import { Location } from "@/app/location/location";

export const userApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "usersApi",
  endpoints: (build) => ({
    getUser: build.query<Location[], string>({
      query: (clientId: string) =>
        `${CLIENTS_PATH}/${clientId}/${LOCATIONS_PATH}`,
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
