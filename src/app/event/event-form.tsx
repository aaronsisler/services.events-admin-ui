"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "../common/form-field";
import { useErrorStore, ErrorState } from "../common/error-store";
import { Event } from "./event";
import { EventRepository } from "./event-repository";
import { EventState, useEventStore } from "./event-store";
import { Organizer } from "../organizer/organizer";
import { Location } from "../location/location";

export type EventFormData = {
  locationId: string;
  name: string;
  organizerId: string;
};

const eventSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
  locationId: zodString(),
  organizerId: zodString(),
});

interface EventFormProps {
  clientId: string;
  locations: Location[];
  organizers: Organizer[];
}

const EventForm = ({ clientId, locations, organizers }: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const addEvent = useEventStore((state: EventState) => state.addEvent);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  const onSubmit = async (submittedEvent: Event) => {
    try {
      clearErrorMessage();
      console.log("submittedEvent");
      console.log(submittedEvent);
      const cleanedData: any = Object.keys(submittedEvent).reduce(
        (acc: any, key: string) => {
          console.log("key " + key + " value: " + submittedEvent[key]);
          return acc[key] === "" ? undefined : submittedEvent[key];
        },
        {}
      );

      console.log("cleanedData");
      console.log(cleanedData);

      const event: Event = await EventRepository.create({
        clientId,
        ...cleanedData,
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
      <label htmlFor="locationId">Location</label>:
      <select {...register("locationId")}>
        <option value="">Select an location</option>
        {locations.map((location) => (
          <option key={location.locationId} value={`${location.locationId}`}>
            {location.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="organizerId">Organizer</label>:
      <select {...register("organizerId")}>
        <option value="">Select an organizer</option>
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
