import React from "react";

import { Location } from "./location";

interface LocationListProps {
  locations: Location[];
}

const LocationList = ({ locations = [] }: LocationListProps) => (
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

export { LocationList };
