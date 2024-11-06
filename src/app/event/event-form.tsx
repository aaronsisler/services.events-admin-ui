"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "../common/form-field";
import { useErrorStore, ErrorState } from "../common/error-store";
import { Client } from "../client/client";
import { ClientState, useClientStore } from "../client/client-store";
import { Event } from "./event";
import { EventRepository } from "./event-repository";
import { EventState, useEventStore } from "./event-store";
import { Organizer } from "../organizer/organizer";
import {
  OrganizerState,
  useOrganizerStore,
} from "../organizer/organizer-store";

export type EventFormData = {
  organizerId: string;
  name: string;
};

const eventSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
  organizerId: zodString(),
});

const EventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const organizers: Organizer[] = useOrganizerStore(
    (state: OrganizerState) => state.organizers
  );
  const addEvent = useEventStore((state: EventState) => state.addEvent);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  const onSubmit = async (submittedEvent: Event) => {
    clearErrorMessage();
    try {
      const event: Event = await EventRepository.create({
        clientId: client?.clientId,
        ...submittedEvent,
      });
      addEvent(event);
      reset();
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit((event: EventFormData) => onSubmit(event))}>
      <FormField
        type="text"
        placeholder="Event Name"
        name="name"
        register={register}
        error={errors.name}
      />
      <br />
      <label htmlFor="organizerId">Organizer</label>:
      <select {...register("organizerId")}>
        <option value={undefined}>Select an organizer</option>
        {organizers.map((organizer) => (
          <option
            key={organizer.organizerId}
            value={`${organizer.organizerId}`}
          >
            {organizer.name}
          </option>
        ))}
      </select>
      <br />
      <input className="btn btn-blue mt-5" type="submit" value="Create Event" />
    </form>
  );
};

export { EventForm };
