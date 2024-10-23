"use client";

import { useEffect } from "react";

import { Client } from "../client/client";
import { ClientState, useClientStore } from "../state/client-store";
import { useErrorStore, ErrorState } from "../state/error-store";
import { ClientDisplay } from "./client-display";
import { ClientForm } from "./client-form";
import { ClientList } from "./client-list";
import { ClientRepository } from "./client-repository";

function Clients() {
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const clients: Client[] = useClientStore(
    (state: ClientState) => state.clients
  );
  const setClient = useClientStore((state: ClientState) => state.setClient);
  const setClients = useClientStore((state: ClientState) => state.setClients);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearErrorMessage();
        const clients: Client[] = await ClientRepository.readAll();
        setClients(clients);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorMessage(error);
      }
    };

    fetchData();
  }, [setClients, clearErrorMessage, setErrorMessage]);

  return (
    <main>
      <ClientDisplay client={client} />
      <br />
      <br />
      <ClientList clients={clients} setClient={setClient} />
      <br />
      <br />
      <ClientForm />
    </main>
  );
}

export default Clients;
