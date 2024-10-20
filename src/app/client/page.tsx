"use client";

import { Client } from "../client/client";
import { ClientState, useClientStore } from "../state/client-store";
import { ClientDisplay } from "./client-display";
import { ClientForm } from "./client-form";
import { ClientList } from "./client-list";

function Clients() {
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const clients: Client[] = useClientStore(
    (state: ClientState) => state.clients
  );
  const createClient = useClientStore(
    (state: ClientState) => state.createClient
  );
  const getClients = useClientStore((state: ClientState) => state.getClients);
  const setClient = useClientStore((state: ClientState) => state.setClient);

  return (
    <main>
      <ClientDisplay client={client} />
      <br />
      <br />
      <button className="btn btn-blue" onClick={getClients}>
        Get Clients
      </button>
      <br />
      <br />
      {clients.length == 0 ? (
        <div>No clients found or loaded.</div>
      ) : (
        <ClientList clients={clients} setClient={setClient} />
      )}
      <br />
      <br />
      <ClientForm createClient={createClient} />
    </main>
  );
}

export default Clients;
