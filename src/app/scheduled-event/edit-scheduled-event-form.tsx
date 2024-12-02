"use client";

import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";

export type EditScheduledEventFormProps = {
  scheduledEvent: ScheduledEvent;
};

const EditScheduledEventForm: React.FC<EditScheduledEventFormProps> = ({
  scheduledEvent,
}) => {
  return (
    <div className="flex gap-2">
      <span>EditScheduledEventForm</span>
      <div>{scheduledEvent.name}</div>
      <div>{scheduledEvent.description}</div>
    </div>
  );
};

export { EditScheduledEventForm };
