"use client";

import { useEffect } from "react";

import { Location } from "./location";
import { LocationList } from "./location-list";
import { LocationRepository } from "./location-repository";
import { LocationState, useLocationStore } from "./location-store";
import { useErrorStore, ErrorState } from "../common/error-store";
import { Client } from "../client/client";
import { ClientState, useClientStore } from "../client/client-store";
import { LocationForm } from "./location-form";

function Locations() {
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const locations: Location[] = useLocationStore(
    (state: LocationState) => state.locations
  );
  const setLocations = useLocationStore(
    (state: LocationState) => state.setLocations
  );
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  useEffect(() => {
    const fetchData = async (clientId: string) => {
      try {
        clearErrorMessage();
        const locations: Location[] = await LocationRepository.getAll(clientId);
        setLocations(locations);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };

    if (client?.clientId) {
      fetchData(client.clientId);
    }
  }, [client?.clientId, setLocations, clearErrorMessage, setErrorMessage]);

  return (
    <main>
      <LocationForm />
      <br />
      <LocationList locations={locations} />
    </main>
  );
}

export default Locations;
