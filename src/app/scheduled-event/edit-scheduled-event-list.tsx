"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getScheduledEvents } from "@/lib/features/event-schedule/event-schedule-slice";
import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";
import { EditScheduledEventForm } from "./edit-scheduled-event-form";

const EditScheduledEventList = () => {
  const scheduledEvents: ScheduledEvent[] = useSelector(getScheduledEvents);

  return (
    <React.Fragment>
      {scheduledEvents?.map((scheduledEvent, index) => (
        <EditScheduledEventForm
          key={index}
          index={index}
          scheduledEvent={scheduledEvent}
        />
      ))}
    </React.Fragment>
  );
};

export { EditScheduledEventList };
