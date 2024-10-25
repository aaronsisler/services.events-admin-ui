import { create } from "zustand";

import { Organizer } from "../organizer/organizer";

export interface OrganizerState {
  organizers: Organizer[];
  addOrganizer(organizer: Organizer): void;
  setOrganizers(organizers: Organizer[]): void;
}

export const useOrganizerStore = create<OrganizerState>((set) => ({
  organizers: [],
  addOrganizer: (organizer: Organizer) => {
    set((state: OrganizerState) => ({
      ...state,
      organizers: [...state.organizers, organizer],
    }));
  },
  setOrganizers: (organizers: Organizer[]) =>
    set((state: OrganizerState) => ({
      ...state,
      organizers,
    })),
}));
