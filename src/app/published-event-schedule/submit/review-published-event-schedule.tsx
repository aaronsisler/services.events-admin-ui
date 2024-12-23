"use client";

import React from "react";
import { useSelector } from "react-redux";

import { getPublishedEventSchedule } from "@/lib/features/published-event-schedule/published-event-schedule-slice";
import { PublishedEventSchedule } from "@/lib/features/published-event-schedule/published-event-schedule";

const ReviewPublishedEventSchedule = () => {
  const publishedEventSchedule: PublishedEventSchedule = useSelector(
    getPublishedEventSchedule
  );

  return (
    <div>
      <div>Event Schedule Id: {publishedEventSchedule.eventScheduleId}</div>
      <div>Target Year: {publishedEventSchedule.targetYear}</div>
      <div>Target Month: {publishedEventSchedule.targetMonth}</div>
      <div>Name: {publishedEventSchedule.name}</div>
    </div>
  );
};

export { ReviewPublishedEventSchedule };
