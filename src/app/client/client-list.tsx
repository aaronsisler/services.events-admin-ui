import React from "react";

import { Client } from "./client";

interface ClientListProps {
  clients: Client[];
  setClient(clientId: string): void;
}

const ClientList = ({ clients, setClient }: ClientListProps) => (
  <table>
    <thead>
      <th>Client Id</th>
      <th>Client Name</th>
    </thead>
    <tbody>
      {clients.map((client, index) => (
        <tr key={index}>
          <td>{client.clientId}</td>
          <td>{client.name}</td>
          <td>
            <button
              className="btn btn-blue my-3"
              onClick={() => setClient(client.clientId || "")}
            >
              Assign
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export { ClientList };
