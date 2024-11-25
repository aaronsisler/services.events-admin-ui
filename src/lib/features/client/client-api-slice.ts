import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Client } from "@/app/client/client";
import { BASE_URL, CLIENTS_PATH } from "@/app/constants";

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
