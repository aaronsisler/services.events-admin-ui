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
