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

export type PopulateEventScheduleFormData = {
  eventId: string;
  eventScheduleId: string;
};

const populateEventScheduleSchema: ZodTypeAny = zodObject({
  eventId: zodString().min(1, { message: "Required" }),
});

const PopulateEventScheduleForm = () => {
  const dispatch = useDispatch();

  const eventScheduleId: string = useSelector(getEventScheduleId);
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
  } = useForm<PopulateEventScheduleFormData>({
    resolver: zodResolver(populateEventScheduleSchema),
  });

  const onSubmit = async ({
    eventId,
    eventScheduleId,
  }: PopulateEventScheduleFormData) => {
    const event: Event | undefined = events?.find(
      (event) => event.eventId === eventId
    );

    if (event) {
      const { locationId, organizerId } = event;
      dispatch(
        addScheduledEvent({
          eventScheduleId,
          locationId,
          organizerId,
          ...event,
        })
      );
      reset();
    }
  };

  return (
    <div>
      <div>Event Schedule Id: {eventScheduleId}</div>
      <form
        onSubmit={handleSubmit(({ eventId }: PopulateEventScheduleFormData) =>
          onSubmit({ eventId, eventScheduleId })
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
        &nbsp;&nbsp;&nbsp;
        <input className="btn btn-blue mt-5" type="submit" value="Add Event" />
      </form>
    </div>
  );
};

export { PopulateEventScheduleForm };
