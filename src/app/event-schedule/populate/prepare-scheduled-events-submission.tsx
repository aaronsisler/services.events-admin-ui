"use client";

import { useRouter } from "next/navigation";

const PrepareScheduledEventsForm = () => {
  const router = useRouter();

  const prepareEventSchedule = async () => {
    router.push("/event-schedule/submit");
  };

  return (
    <div>
      <input
        className="btn btn-blue mt-5"
        onClick={prepareEventSchedule}
        type="button"
        value="Prepare Event Schedule for submission"
      />
    </div>
  );
};

export { PrepareScheduledEventsForm };
