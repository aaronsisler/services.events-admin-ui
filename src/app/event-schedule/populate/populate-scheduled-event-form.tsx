"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormSelectField } from "@/app/common/form-select-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { Event } from "@/lib/features/event/event";
import { useGetAllEventsQuery } from "@/lib/features/event/event-api-slice";
import {
  getEventScheduleId,
  addScheduledEvent,
} from "@/lib/features/event-schedule/event-schedule-slice";

export type PopulateScheduledEventFormData = {
  eventId: string;
};

const populateScheduledEventSchema: ZodTypeAny = zodObject({
  eventId: zodString().min(1, { message: "Required" }),
});

const PopulateScheduledEventForm = () => {
  const eventScheduleId: string = useSelector(getEventScheduleId);
  const dispatch = useDispatch();

  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;
  const { data: events } = useGetAllEventsQuery(clientId, {
    skip: !isClientIdPopulated,
  });

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PopulateScheduledEventFormData>({
    resolver: zodResolver(populateScheduledEventSchema),
  });

  const onSubmit = async (eventId: string) => {
    const event: Event | undefined = events?.find(
      (event) => event.eventId === eventId
    );

    if (event) {
      dispatch(addScheduledEvent({ eventScheduleId, ...event }));
      reset();
    }
  };

  return (
    <div>
      <div>Event Schedule Id: {eventScheduleId}</div>
      <form
        onSubmit={handleSubmit(({ eventId }: PopulateScheduledEventFormData) =>
          onSubmit(eventId)
        )}
      >
        <FormSelectField
          name="eventId"
          selectOptions={events?.map((event) => ({
            id: event.eventId,
            displayValue: event.name,
          }))}
          register={registerFormInput}
          error={errors.eventId}
          placeholder="Select event"
        />
        <input className="btn btn-blue mt-5" type="submit" value="Add Event" />
      </form>
    </div>
  );
};

export { PopulateScheduledEventForm };
