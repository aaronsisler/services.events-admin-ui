import { create } from "zustand";

import { BASE_URL, ORGANIZERS_PATH } from "../constants";

interface Organizer {
  clientId: string;
  organizerId: string;
  name: string;
  createdOn: string;
  lastUpdatedOn: string;
}

export interface OrganizerState {
  organizers: Organizer[];
}

export const useOrganizerStore = create((set) => ({
  organizers: [],
  fetch: async () => {
    try {
      const response = await fetch(`${BASE_URL}/${ORGANIZERS_PATH}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      // if (!response.ok) {
      // throw new Error(`Response status: ${response.status}`);
      // }

      const content = await response.json();

      console.log(content);
      set({ organizers: await response.json() });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      console.error(error.message);
    }
  },
}));
