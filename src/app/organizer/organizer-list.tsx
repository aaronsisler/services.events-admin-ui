import React from "react";

import { Organizer } from "./organizer";

interface OrganizerListProps {
  organizers: Organizer[];
}

const OrganizerList = ({ organizers }: OrganizerListProps) => (
  <table>
    <thead>
      <th>Organizer Id</th>
      <th>Organizer Name</th>
    </thead>
    <tbody>
      {organizers.map((organizer, index) => (
        <tr key={index}>
          <td>{organizer.organizerId}</td>
          <td>{organizer.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export { OrganizerList };
