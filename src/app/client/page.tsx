"use client";

import { useEffect } from "react";

import { ClientForm } from "./client-form";
import { ClientList } from "./client-list";
import { ClientRepository } from "./client-repository";
import { Client } from "../client/client";
import { ClientState, useClientStore } from "./client-store";
import { useErrorStore, ErrorState } from "../common/error-store";

function Clients() {
  const clients: Client[] = useClientStore(
    (state: ClientState) => state.clients
  );
  const setClients = useClientStore((state: ClientState) => state.setClients);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearErrorMessage();
        const clients: Client[] = await ClientRepository.getAll();
        setClients(clients);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };

    fetchData();
  }, [setClients, clearErrorMessage, setErrorMessage]);

  return (
    <main>
      <ClientList clients={clients} />
      <br />
      <br />
      <ClientForm />
    </main>
  );
}

export default Clients;
