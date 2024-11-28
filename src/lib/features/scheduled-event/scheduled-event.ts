import { ScheduledEventDay } from "./scheduled-event-day";
import { ScheduledEventInterval } from "./scheduled-event-interval";
import { ScheduledEventType } from "./scheduled-event-type";

export interface Event {
  clientId: string;
  eventId: string;
  eventScheduleId: string;
  name: string;
  locationId?: string;
  organizerId?: string;
  scheduledEventType?: ScheduledEventType;
  scheduledEventInterval?: ScheduledEventInterval;
  scheduledEventDay?: ScheduledEventDay;
  description?: string;
  category?: string;
  startTime?: string;
  endTime?: string;
  scheduledEventDate?: string;
  cost?: number;
  createdOn?: string;
  lastUpdatedOn?: string;
}
