"use client";

import React from "react";

import { useGetClientsQuery } from "@/lib/features/clients/clients-api-slice";

const ClientList = () => {
  const { data: clients, isError } = useGetClientsQuery();

  return (
    <React.Fragment>
      {isError && <div>Error!</div>}

      <table>
        <thead>
          <tr>
            <th>Location Id</th>
            <th>Location Name</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client, index) => (
            <tr key={index}>
              <td>{client.clientId}</td>
              <td>{client.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { ClientList };
