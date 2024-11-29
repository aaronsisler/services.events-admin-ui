"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getClientId } from "@/lib/features/common/common-slice";
import { useGetAllEventsQuery } from "@/lib/features/event/event-api-slice";

const EventList = () => {
  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;

  const { data: events, isError } = useGetAllEventsQuery(clientId, {
    skip: !isClientIdPopulated,
  });

  return (
    <React.Fragment>
      {isError && <div>Error!</div>}

      <table>
        <thead>
          <tr>
            <th>Event Id</th>
            <th>Event Name</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event, index) => (
            <tr key={index}>
              <td>{event.eventId}</td>
              <td>{event.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { EventList };
