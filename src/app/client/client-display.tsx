import React from "react";

import { Client } from "./client";

interface ClientDisplayProps {
  client: Client | undefined;
}

const ClientDisplay = ({ client }: ClientDisplayProps) => (
  <React.Fragment>
    Client:
    <br />
    {client?.name || "No client selected"}
  </React.Fragment>
);

export { ClientDisplay };
