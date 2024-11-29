import React from "react";
import { ClientList } from "./client-list";
import { ClientSet } from "./client-set";

export default function ClientsPage() {
  return (
    <React.Fragment>
      <br />
      <ClientSet />
      <br />
      <hr />
      <br />
      <ClientList />
    </React.Fragment>
  );
}
