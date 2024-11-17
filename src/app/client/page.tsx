import { ClientList } from "./client-list";

import { useGetClientsQuery } from "@/lib/features/clients/clients-api-slice";

export default function ClientsPage() {
  const { data, isError, isSuccess } = useGetClientsQuery();

  return (
    <>
      <h1>Clients page</h1>
      <p>This page is intended to show the Clients feature.</p>
      {isError && <div>Error!</div>}
      {isSuccess && <ClientList clients={data} />}
    </>
  );
}
