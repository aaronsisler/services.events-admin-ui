"use client";

import { useEffect } from "react";

import { Event } from "./event";
import { EventList } from "./event-list";
import { EventRepository } from "./event-repository";
import { EventState, useEventStore } from "./event-store";
import { useErrorStore, ErrorState } from "../common/error-store";
import { Client } from "../client/client";
import { ClientState, useClientStore } from "../client/client-store";
import { EventForm } from "./event-form";
import { Location } from "../location/location";
import { LocationRepository } from "../location/location-repository";
import { LocationState, useLocationStore } from "../location/location-store";
import { Organizer } from "../organizer/organizer";
import { OrganizerRepository } from "../organizer/organizer-repository";
import {
  OrganizerState,
  useOrganizerStore,
} from "../organizer/organizer-store";

function Events() {
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const events: Event[] = useEventStore((state: EventState) => state.events);
  const setEvents = useEventStore((state: EventState) => state.setEvents);
  const setLocations = useLocationStore(
    (state: LocationState) => state.setLocations
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
        const locations: Location[] = await LocationRepository.getAll(clientId);
        setLocations(locations);
        const organizers: Organizer[] = await OrganizerRepository.getAll(
          clientId
        );
        setOrganizers(organizers);
        const events: Event[] = await EventRepository.getAll(clientId);
        setEvents(events);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };

    if (client?.clientId) {
      fetchData(client.clientId);
    }
  }, [
    client?.clientId,
    setEvents,
    setLocations,
    setOrganizers,
    clearErrorMessage,
    setErrorMessage,
  ]);

  return (
    <main>
      <EventForm />
      <br />
      <EventList events={events} />
    </main>
  );
}

export default Events;
