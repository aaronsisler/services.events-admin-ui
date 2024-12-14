import { ViewScheduledEventList } from "@/app/scheduled-event/view-scheduled-event-list";
import { SubmitScheduledEventsForm } from "./submit-scheduled-events-form";

function SubmitEventSchedule() {
  return (
    <main>
      <SubmitScheduledEventsForm />
      <br />
      <br />
      <ViewScheduledEventList />
    </main>
  );
}

export default SubmitEventSchedule;
