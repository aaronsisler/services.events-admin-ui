import { create } from "zustand";

import { Event } from "./event";

export interface EventState {
  events: Event[];
  addEvent(event: Event): void;
  setEvents(events: Event[]): void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  addEvent: (event: Event) => {
    set((state: EventState) => ({
      ...state,
      events: [...state.events, event],
    }));
  },
  setEvents: (events: Event[]) =>
    set((state: EventState) => ({
      ...state,
      events,
    })),
}));
