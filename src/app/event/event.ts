export interface Event {
  clientId?: string;
  eventId?: string;
  organizerId?: string;
  locationId?: string;
  name: string;
  description?: string;
  category?: string;
  createdOn?: string;
  lastUpdatedOn?: string;
}
