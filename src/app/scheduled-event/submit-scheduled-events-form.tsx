"use client";

import React from "react";
import { useSelector } from "react-redux";

import {
  getEventScheduleId,
  getScheduledEvents,
} from "@/lib/features/event-schedule/event-schedule-slice";
import { usePostScheduledEventsMutation } from "@/lib/features/scheduled-event/scheduled-event-api-slice";
import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";

const SubmitScheduledEventsForm = () => {
  const eventScheduleId = useSelector(getEventScheduleId);
  const scheduledEvents = useSelector(getScheduledEvents);
  const [register] = usePostScheduledEventsMutation();
  // const dispatch = useDispatch();

  const handleSubmit = async ({
    eventScheduleId,
    scheduledEvents,
  }: {
    eventScheduleId: string;
    scheduledEvents: ScheduledEvent[];
  }) => {
    const { error } = await register({
      eventScheduleId,
      scheduledEvents,
    });

    const wasPostSuccessful: boolean = error == undefined;

    // If there is no error during the POST, reset/clear the form
    if (wasPostSuccessful) {
      console.log("here");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-blue mt-5"
      onClick={() => handleSubmit({ eventScheduleId, scheduledEvents })}
    >
      Submit
    </button>
  );
};

export { SubmitScheduledEventsForm };