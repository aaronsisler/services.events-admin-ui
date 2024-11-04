import { create } from "zustand";

import { Location } from "./location";

export interface LocationState {
  locations: Location[];
  addLocation(location: Location): void;
  setLocations(locations: Location[]): void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  addLocation: (location: Location) => {
    set((state: LocationState) => ({
      ...state,
      locations: [...state.locations, location],
    }));
  },
  setLocations: (locations: Location[]) =>
    set((state: LocationState) => ({
      ...state,
      locations,
    })),
}));
