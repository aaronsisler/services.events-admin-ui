import { create } from "zustand";

import { Client } from "../client/client";

export interface ClientState {
  client: Client | undefined;
  clients: Client[];
  addClient(client: Client): void;
  setClient(clientId: string): void;
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
  setClient: (clientId: string) =>
    set((state: ClientState) => ({
      ...state,
      client: state.clients.find((client) => client.clientId == clientId),
    })),
  setClients: (clients: Client[]) =>
    set((state: ClientState) => ({
      ...state,
      clients,
    })),
}));
