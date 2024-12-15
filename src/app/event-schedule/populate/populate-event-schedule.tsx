"use client";

import { useSelector } from "react-redux";
import { getEventScheduleId } from "@/lib/features/event-schedule/event-schedule-slice";

const PopulateEventScheduleForm = () => {
  const eventScheduleId: string = useSelector(getEventScheduleId);

  return (
    <div>
      <div>Event Schedule Id: {eventScheduleId}</div>
    </div>
  );
};

export { PopulateEventScheduleForm };
