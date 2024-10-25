import { create } from "zustand";

import { Client } from "../client/client";

export interface ClientState {
  clients: Client[];
  addClient(client: Client): void;
  setClients(client: Client[]): void;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [],
  addClient: (client: Client) => {
    set((state: ClientState) => ({
      ...state,
      clients: [...state.clients, client],
    }));
  },
  setClients: (clients: Client[]) =>
    set((state: ClientState) => ({
      ...state,
      clients,
    })),
}));
