"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getScheduledEvents } from "@/lib/features/event-schedule/event-schedule-slice";
import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";

const ScheduledEventList = () => {
  const scheduledEvents: ScheduledEvent[] = useSelector(getScheduledEvents);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Event Type</th>
          <th>Event Interval</th>
          <th>Event Day</th>
          <th>Event Date</th>
          <th>Category</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {scheduledEvents?.map((scheduledEvent, index) => (
          <tr key={index}>
            <td>{scheduledEvent.name}</td>
            <td>{scheduledEvent.scheduledEventType}</td>
            <td>{scheduledEvent.scheduledEventInterval}</td>
            <td>{scheduledEvent.scheduledEventDay}</td>
            <td>{scheduledEvent.scheduledEventDate}</td>
            <td>{scheduledEvent.category}</td>
            <td>{scheduledEvent.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ScheduledEventList };
