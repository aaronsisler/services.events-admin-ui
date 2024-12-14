"use client";
import { useSelector } from "react-redux";

import {
  getEventScheduleId,
  getScheduledEvents,
} from "@/lib/features/event-schedule/event-schedule-slice";
import { usePostScheduledEventsMutation } from "@/lib/features/scheduled-event/scheduled-event-api-slice";
import React from "react";

const SubmitScheduledEventsForm = () => {
  const [register, { isSuccess, isError }] = usePostScheduledEventsMutation();
  const eventScheduleId = useSelector(getEventScheduleId);
  const scheduledEvents = useSelector(getScheduledEvents);

  const handleScheduledEventsSubmission = async () => {
    await register({
      eventScheduleId,
      scheduledEvents,
    });
  };

  return (
    <div>
      {isError && (
        <React.Fragment>
          <div>Something went wrong during submission!</div>
          <br />
        </React.Fragment>
      )}
      {isSuccess && (
        <React.Fragment>
          <div>Something went right during submission!</div>
          <br />
        </React.Fragment>
      )}
      <input
        className="btn btn-blue mt-5"
        type="button"
        onClick={handleScheduledEventsSubmission}
        value="Submit Scheduled Events"
      />
    </div>
  );
};

export { SubmitScheduledEventsForm };
