import React from "react";

import { Event } from "./event";

interface EventListProps {
  events: Event[];
}

const EventList = ({ events = [] }: EventListProps) => (
  <table>
    <thead>
      <tr>
        <th>Event Id</th>
        <th>Event Name</th>
      </tr>
    </thead>
    <tbody>
      {events.map((event, index) => (
        <tr key={index}>
          <td>{event.eventId}</td>
          <td>{event.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export { EventList };
