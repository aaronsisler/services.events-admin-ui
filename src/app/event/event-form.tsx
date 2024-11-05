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

export type EventFormData = {
  name: string;
};

const eventSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
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
  const addEvent = useEventStore((state: EventState) => state.addEvent);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  const onSubmit = async (name: string) => {
    clearErrorMessage();
    try {
      const event: Event = await EventRepository.create({
        name,
        clientId: client?.clientId,
      });
      addEvent(event);
      reset();
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(({ name }: EventFormData) => onSubmit(name))}>
      <FormField
        type="text"
        placeholder="Event Name"
        name="name"
        register={register}
        error={errors.name}
      />
      <br />
      <input className="btn btn-blue mt-5" type="submit" value="Create Event" />
    </form>
  );
};

export { EventForm };
