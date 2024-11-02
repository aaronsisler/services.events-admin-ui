import React from "react";

import { Client } from "./client";

interface ClientListProps {
  clients: Client[];
}

const ClientList = ({ clients }: ClientListProps) => (
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
        </tr>
      ))}
    </tbody>
  </table>
);

export { ClientList };
