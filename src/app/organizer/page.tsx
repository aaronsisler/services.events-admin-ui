"use client";

import { useEffect } from "react";

import { Organizer } from "./organizer";
import { OrganizerList } from "./organizer-list";
import { OrganizerRepository } from "./organizer-repository";
import { OrganizerState, useOrganizerStore } from "./organizer-store";
import { useErrorStore, ErrorState } from "../common/error-store";
import { Client } from "../client/client";
import { ClientState, useClientStore } from "../client/client-store";
import { OrganizerForm } from "./orgainzer-form";

function Organizers() {
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const organizers: Organizer[] = useOrganizerStore(
    (state: OrganizerState) => state.organizers
  );
  const setOrganizers = useOrganizerStore(
    (state: OrganizerState) => state.setOrganizers
  );
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  useEffect(() => {
    const fetchData = async (clientId: string) => {
      try {
        clearErrorMessage();
        const organizers: Organizer[] = await OrganizerRepository.getAll(
          clientId
        );
        setOrganizers(organizers);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };

    if (client?.clientId) {
      fetchData(client.clientId);
    }
  }, [client?.clientId, setOrganizers, clearErrorMessage, setErrorMessage]);

  return (
    <main>
      <OrganizerForm />
      <br />
      <OrganizerList organizers={organizers} />
    </main>
  );
}

export default Organizers;
