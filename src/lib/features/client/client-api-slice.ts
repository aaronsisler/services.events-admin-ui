import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, CLIENTS_PATH } from "@/lib/constants";
import { Client } from "@/lib/features/client/client";

interface ClientEnvelope {
  clients: Client[];
}

export const clientApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "clients",
  tagTypes: ["Client"],
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => CLIENTS_PATH,
      providesTags: ["Client"],
    }),
    postClients: build.mutation<Client[], Partial<ClientEnvelope>>({
      query: ({ clients }) => ({
        url: `${CLIENTS_PATH}}`,
        method: "POST",
        body: clients,
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const { useGetClientsQuery, usePostClientsMutation } = clientApiSlice;
