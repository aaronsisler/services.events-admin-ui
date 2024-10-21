"use client";

import { useEffect } from "react";

import { Client } from "../client/client";
import { ClientState, useClientStore } from "../state/client-store";
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

  useEffect(() => {
    // declare the data fetching function
    async function fetchData() {
      const clients: Client[] = await ClientRepository.readAll();
      setClients(clients);
    }

    fetchData();
  }, []);

  return (
    <main>
      <ClientDisplay client={client} />
      <br />
      <br />
      {/* <button className="btn btn-blue" onClick={getClients}> */}
      {/* Get Clients */}
      {/* </button> */}
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
