export interface PublishedEventSchedule {
  clientId: string;
  eventScheduleId: string;
  publishedEventScheduleId?: string;
  name: string;
  targetYear: number;
  targetMonth: number;
  filename?: string;
  createdOn?: string;
  lastUpdatedOn?: string;
}
