import { ScheduledEventList } from "@/app/scheduled-event/scheduled-event-list";
import { PopulateEventScheduleForm } from "./populate-event-schedule";

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
      <ScheduledEventList />
    </main>
  );
}

export default PopulateEventSchedule;
