import { PopulateEventScheduleForm } from "./populate-event-schedule";
import { EditScheduledEventList } from "@/app/scheduled-event/edit-scheduled-event-list";

function PopulateEventSchedule() {
  return (
    <main>
      <br />
      <PopulateEventScheduleForm />
      <br />
      <div>
        Here will be a form with a dropdown of Events that can be selected to
        add to a list of Scheduled Events for the Event Schedule.
      </div>
      <br />
      <hr />
      <br />
      <EditScheduledEventList />
    </main>
  );
}

export default PopulateEventSchedule;
