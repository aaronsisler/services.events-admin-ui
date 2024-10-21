import { create } from "zustand";

import { BASE_URL, CLIENTS_PATH } from "../constants";
import { Client } from "../client/client";
import { useErrorStore } from "../state/error-store";

export interface ClientState {
  client?: Client;
  clients: Client[];
  addClient(client: Client): void;
  getClients(): void;
  setClient(clientId: string): void;
}

export const useClientStore = create<ClientState>((set) => ({
  client: undefined,
  clients: [],
  addClient: (client: Client) => {
    set((state: ClientState) => ({
      ...state,
      clients: [...state.clients, client],
    }));
  },
  getClients: async () => {
    useErrorStore.getState().clearErrorMessage();

    try {
      const response = await fetch(`${BASE_URL}/${CLIENTS_PATH}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

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
      console.log("ERROR");
      console.log(error.message);
      useErrorStore
        .getState()
        .setErrorMessage("Error calling to server. Is the server started?");
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
