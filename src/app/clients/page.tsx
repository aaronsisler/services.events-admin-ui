"use client";

import { Client, useClientStore } from "../state/client-store";

function Clients() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchClients = useClientStore((state: any) => state.fetch);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clients: Client[] = useClientStore((state: any) => state.clients);

  return (
    <main>
      Clients
      <br />
      <br />
      <button className="btn btn-blue" onClick={fetchClients}>
        Fetch Clients
      </button>
      <br />
      <br />
      <ul>
        {clients.map((client, index) => (
          <li key={index}>{client.name}</li>
        ))}
      </ul>
    </main>
  );
}

export default Clients;
