export interface Event {
  clientId: string;
  name: string;
  eventId?: string;
  locationId?: string;
  organizerId?: string;
  description?: string;
  category?: string;
  createdOn?: string;
  lastUpdatedOn?: string;
}
