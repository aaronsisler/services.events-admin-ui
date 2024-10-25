"use client";

import { useEffect } from "react";

import { OrganizerList } from "./organizer-list";
import { OrganizerRepository } from "./organizer-repository";
import { Organizer } from "./organizer";
import { ClientState, useClientStore } from "../store/client-store";
import { OrganizerState, useOrganizerStore } from "../store/organizer-store";
import { useErrorStore, ErrorState } from "../store/error-store";
import { Client } from "../client/client";

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
        const organizers: Organizer[] = await OrganizerRepository.readAll(
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
      <OrganizerList organizers={organizers} />
    </main>
  );
}

export default Organizers;
