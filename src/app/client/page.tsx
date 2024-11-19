import React from "react";
import { ClientList } from "./client-list";
import { ClientSet } from "./client-set";

export default function ClientsPage() {
  return (
    <React.Fragment>
      <ClientList />
      <ClientSet />
    </React.Fragment>
  );
}
