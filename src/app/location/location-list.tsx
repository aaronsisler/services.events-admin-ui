"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getClientId } from "@/lib/features/common/common-slice";
import { useGetAllLocationsQuery } from "@/lib/features/location/location-api-slice";

const LocationList = () => {
  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;

  const { data: locations, isError } = useGetAllLocationsQuery(clientId, {
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
          {locations?.map((location, index) => (
            <tr key={index}>
              <td>{location.locationId}</td>
              <td>{location.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { LocationList };
