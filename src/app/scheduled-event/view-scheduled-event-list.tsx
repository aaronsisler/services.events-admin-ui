"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getScheduledEvents } from "@/lib/features/event-schedule/event-schedule-slice";

const ViewScheduledEventList = () => {
  const scheduledEvents = useSelector(getScheduledEvents);

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Location Id</th>
            <th>Description</th>
            <th>Category</th>
            <th>Created On</th>
            <th>Last Updated On</th>
          </tr>
        </thead>
        <tbody>
          {scheduledEvents?.map((scheduledEvent, index) => (
            <tr key={index}>
              <td>{scheduledEvent.eventId}</td>
              <td>{scheduledEvent.name}</td>
              <td>{scheduledEvent.locationId}</td>
              <td>{scheduledEvent.description}</td>
              <td>{scheduledEvent.category}</td>
              <td>{scheduledEvent.createdOn}</td>
              <td>{scheduledEvent.lastUpdatedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { ViewScheduledEventList };
