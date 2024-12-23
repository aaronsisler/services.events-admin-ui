import { ScheduledEventList } from "@/app/scheduled-event/scheduled-event-list";
import { SubmitScheduledEventsForm } from "@/app/scheduled-event/submit-scheduled-events-form";

function SubmitEventSchedule() {
  return (
    <main>
      <br />
      <br />
      <div>
        This will list out the Scheduled Events in Read Only. Submit button will
        then save the Scheduled Events.
      </div>
      <br />
      <SubmitScheduledEventsForm />
      <br />
      <br />
      <hr />
      <br />
      <ScheduledEventList />
    </main>
  );
}

export default SubmitEventSchedule;
