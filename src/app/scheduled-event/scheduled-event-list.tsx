"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getScheduledEvents } from "@/lib/features/event-schedule/event-schedule-slice";
import { EditScheduledEventForm } from "./edit-scheduled-event-form";

const ScheduledEventList = () => {
  const scheduledEvents = useSelector(getScheduledEvents);

  return (
    <React.Fragment>
      {scheduledEvents?.map((scheduledEvent, index) => (
        <EditScheduledEventForm key={index} scheduledEvent={scheduledEvent} />
      ))}
    </React.Fragment>
  );
};

export { ScheduledEventList };
