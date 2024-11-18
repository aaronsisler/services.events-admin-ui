import React from "react";

import { Location } from "./location";

const LocationList = () => {
  const locations: Location[] = [];

  return (
    <table>
      <thead>
        <tr>
          <th>Location Id</th>
          <th>Location Name</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, index) => (
          <tr key={index}>
            <td>{location.locationId}</td>
            <td>{location.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { LocationList };
