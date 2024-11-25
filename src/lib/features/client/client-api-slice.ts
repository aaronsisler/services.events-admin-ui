import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, CLIENTS_PATH } from "@/lib/constants";
import { Client } from "@/lib/features/client/client";

export const clientApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "clients",
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => CLIENTS_PATH,
    }),
  }),
});

export const { useGetClientsQuery } = clientApiSlice;
