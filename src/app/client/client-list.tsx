import React from "react";

import { Client } from "./client";

interface ClientListProps {
  clients: Client[];
  setClient(clientId: string): void;
}

const ClientList = ({ clients, setClient }: ClientListProps) => (
  <React.Fragment>
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
  </React.Fragment>
);

export { ClientList };
