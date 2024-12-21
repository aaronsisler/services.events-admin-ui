import { SubmitScheduledEventsForm } from "../../scheduled-event/submit-scheduled-events-form";

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
    </main>
  );
}

export default SubmitEventSchedule;
