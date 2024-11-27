"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getClientId } from "@/lib/features/common/common-slice";
import { useGetAllOrganizersQuery } from "@/lib/features/organizer/organizer-api-slice";

const OrganizerList = () => {
  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;

  const { data: organizers, isError } = useGetAllOrganizersQuery(clientId, {
    skip: !isClientIdPopulated,
  });

  return (
    <React.Fragment>
      {isError && <div>Error!</div>}

      <table>
        <thead>
          <tr>
            <th>Location Id</th>
            <th>Location Name</th>
          </tr>
        </thead>
        <tbody>
          {organizers?.map((organizer, index) => (
            <tr key={index}>
              <td>{organizer.organizerId}</td>
              <td>{organizer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { OrganizerList };
