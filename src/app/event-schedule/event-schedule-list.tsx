"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getClientId } from "@/lib/features/common/common-slice";
import { useGetAllEventSchedulesQuery } from "@/lib/features/event-schedule/event-schedule-api-slice";

const EventScheduleList = () => {
  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;

  const { data: eventSchedules, isError } = useGetAllEventSchedulesQuery(
    clientId,
    {
      skip: !isClientIdPopulated,
    }
  );

  return (
    <React.Fragment>
      {isError && <div>Error!</div>}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {eventSchedules?.map((eventSchedule, index) => (
            <tr key={index}>
              <td>{eventSchedule.eventScheduleId}</td>
              <td>{eventSchedule.name}</td>
              <td>{eventSchedule.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { EventScheduleList };
