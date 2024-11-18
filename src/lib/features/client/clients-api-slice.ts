import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Client } from "@/app/client/client";
import { BASE_URL, CLIENTS_PATH } from "@/app/constants";

export const clientsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "clientsApi",
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => CLIENTS_PATH,
    }),
  }),
});

export const { useGetClientsQuery } = clientsApiSlice;
