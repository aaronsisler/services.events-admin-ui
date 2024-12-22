"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { getClientId } from "@/lib/features/common/common-slice";
import { usePostPublishedEventScheduleMutation } from "@/lib/features/published-event-schedule/published-event-schedule-api-slice";
import { getPublishedEventSchedule } from "@/lib/features/published-event-schedule/published-event-schedule-slice";
import { PublishedEventSchedule } from "@/lib/features/published-event-schedule/published-event-schedule";

const SubmitPublishedEventScheduleForm = () => {
  const clientId: string = useSelector(getClientId);
  const publishedEventSchedule: PublishedEventSchedule = useSelector(
    getPublishedEventSchedule
  );
  const [register] = usePostPublishedEventScheduleMutation();
  const router = useRouter();

  const handleSubmit = async ({
    clientId,
    publishedEventSchedule,
  }: {
    clientId: string;
    publishedEventSchedule: PublishedEventSchedule;
  }) => {
    const { error } = await register({
      clientId,
      publishedEventSchedule,
    });

    const wasPostSuccessful: boolean = error == undefined;

    // If there is no error during the POST, reset/clear the form
    if (wasPostSuccessful) {
      router.push("/published-event-schedule");
    } else {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-blue mt-5"
      onClick={() => handleSubmit({ clientId, publishedEventSchedule })}
    >
      Submit
    </button>
  );
};

export { SubmitPublishedEventScheduleForm };
