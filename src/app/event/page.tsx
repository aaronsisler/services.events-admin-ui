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

function Events() {
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const events: Event[] = useEventStore((state: EventState) => state.events);
  const setEvents = useEventStore((state: EventState) => state.setEvents);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  useEffect(() => {
    const fetchData = async (clientId: string) => {
      try {
        clearErrorMessage();
        const events: Event[] = await EventRepository.getAll(clientId);
        setEvents(events);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };

    if (client?.clientId) {
      fetchData(client.clientId);
    }
  }, [client?.clientId, setEvents, clearErrorMessage, setErrorMessage]);

  return (
    <main>
      <EventForm />
      <br />
      <EventList events={events} />
    </main>
  );
}

export default Events;
