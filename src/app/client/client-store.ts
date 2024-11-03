import { create } from "zustand";

import { Client } from "./client";

export interface ClientState {
  client: Client | undefined;
  clients: Client[];
  addClient(client: Client): void;
  setClient(client: Client): void;
  setClients(clients: Client[]): void;
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
  setClient: (client: Client) =>
    set((state: ClientState) => ({
      ...state,
      client,
    })),
  setClients: (clients: Client[]) =>
    set((state: ClientState) => ({
      ...state,
      clients,
    })),
}));
