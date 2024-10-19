import { create } from "zustand";

import { BASE_URL, CLIENTS_PATH } from "../constants";

export interface Client {
  clientId: string;
  name: string;
  createdOn: string;
  lastUpdatedOn: string;
}

export interface ClientState {
  clients: Client[];
}

export const useClientStore = create((set) => ({
  clients: [],
  fetch: async () => {
    try {
      const response = await fetch(`${BASE_URL}/${CLIENTS_PATH}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (response.status == 200) {
        return set({ clients: await response.json() });
      }

      set({ clients: [] });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      console.error(error.message);
    }
  },
}));
