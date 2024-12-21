import { NavigateToSubmitScheduledEvents } from "@/app/event-schedule/populate/navigate-to-submit-scheduled-events";
import { PopulateEventScheduleForm } from "@/app/event-schedule/populate/populate-event-schedule";
import { EditScheduledEventList } from "@/app/scheduled-event/edit-scheduled-event-list";

function PopulateEventSchedule() {
  return (
    <main>
      <NavigateToSubmitScheduledEvents />
      <br />
      <PopulateEventScheduleForm />
      <br />
      <hr />
      <br />
      <EditScheduledEventList />
    </main>
  );
}

export default PopulateEventSchedule;
