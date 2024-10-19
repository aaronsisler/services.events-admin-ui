import { create } from "zustand";

import { BASE_URL, CLIENTS_PATH } from "../constants";
import { Client } from "../client/client";

export interface ClientState {
  client?: Client;
  clients: Client[];
  fetch(): void;
  setClient(clientId: string): void;
}

export const useClientStore = create<ClientState>((set) => ({
  client: undefined,
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

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (response.status == 200) {
        const clients = await response.json();
        return set((state: ClientState) => ({
          ...state,
          clients,
        }));
      }

      set((state: ClientState) => ({ ...state, clients: [] }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      console.error(error.message);
    }
  },
  setClient: (clientId: string) =>
    set((state: ClientState) => ({
      ...state,
      client: state.clients.find(
        (client: Client) => client.clientId == clientId
      ),
    })),
}));
