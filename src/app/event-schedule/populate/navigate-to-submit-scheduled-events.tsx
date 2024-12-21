"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NavigateToSubmitScheduledEvents = () => {
  const router = useRouter();

  const handleClick = async () => {
    router.push("/event-schedule/submit");
  };

  return (
    <div>
      <br />
      <input
        className="btn btn-blue mt-5"
        type="button"
        value="Review Scheduled Events"
        onClick={handleClick}
      />
    </div>
  );
};

export { NavigateToSubmitScheduledEvents };
