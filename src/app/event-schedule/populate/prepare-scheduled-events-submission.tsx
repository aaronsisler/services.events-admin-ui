"use client";

import { useRouter } from "next/navigation";

const PrepareScheduledEventsForm = () => {
  const router = useRouter();

  const handleNavigation = async () => {
    router.push("/event-schedule/submit");
  };

  return (
    <div>
      <input
        className="btn btn-blue mt-5"
        onClick={handleNavigation}
        type="button"
        value="Navigate to Event Schedule Submission"
      />
    </div>
  );
};

export { PrepareScheduledEventsForm };
