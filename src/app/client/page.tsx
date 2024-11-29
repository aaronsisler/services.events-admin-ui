import React from "react";
import { ClientList } from "./client-list";
import { ClientForm } from "./client-form";

export default function ClientsPage() {
  return (
    <React.Fragment>
      <br />
      <ClientForm />
      <br />
      <hr />
      <br />
      <ClientList />
    </React.Fragment>
  );
}
