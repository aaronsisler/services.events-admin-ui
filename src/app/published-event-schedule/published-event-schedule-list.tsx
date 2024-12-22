"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getClientId } from "@/lib/features/common/common-slice";
import { useGetAllPublishedEventSchedulesQuery } from "@/lib/features/published-event-schedule/published-event-schedule-api-slice";

const PublishedEventScheduleList = () => {
  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;

  const { data: publishedEventSchedules, isError } =
    useGetAllPublishedEventSchedulesQuery(clientId, {
      skip: !isClientIdPopulated,
    });

  return (
    <React.Fragment>
      {isError && <div>Error!</div>}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Created On</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {publishedEventSchedules?.map((publishedEventSchedule, index) => (
            <tr key={index}>
              <td>{publishedEventSchedule.publishedEventScheduleId}</td>
              <td>{publishedEventSchedule.createdOn}</td>
              <td>{publishedEventSchedule.name}</td>
              <td>{publishedEventSchedule.filename}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { PublishedEventScheduleList };
