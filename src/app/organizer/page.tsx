"use client";

import { useOrganizerStore } from "../state/organizer-store";

function Organizers() {
  const fetchOrganizers = useOrganizerStore((state) => state.fetch);

  return (
    <main>
      Organizers
      <br />
      <button onClick={fetchOrganizers}>one up</button>
    </main>
  );
}

export default Organizers;
