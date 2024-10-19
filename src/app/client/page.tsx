"use client";

import { Client } from "../client/client";
import { ClientState, useClientStore } from "../state/client-store";

function Clients() {
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const clients: Client[] = useClientStore(
    (state: ClientState) => state.clients
  );
  const fetchClients = useClientStore((state: ClientState) => state.fetch);
  const setClient = useClientStore((state: ClientState) => state.setClient);

  return (
    <main>
      Client:
      <br />
      {client?.name || "No client selected"}
      <br />
      <br />
      <button className="btn btn-blue" onClick={fetchClients}>
        Fetch Clients
      </button>
      <br />
      <br />
      {clients.length == 0 ? (
        <div>No clients found or loaded.</div>
      ) : (
        <ul>
          {clients.map((client, index) => (
            <li key={index}>
              <button
                className="btn btn-blue my-3"
                onClick={() => setClient(client.clientId)}
              >
                {client.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Clients;
