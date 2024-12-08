import { PopulateScheduledEventForm } from "./populate-scheduled-event-form";
import { ScheduledEventList } from "@/app/scheduled-event/scheduled-event-list";
import { PrepareScheduledEventsForm } from "./prepare-scheduled-events-submission";

function PopulateEventSchedule() {
  return (
    <main>
      <br />
      <br />
      <PopulateScheduledEventForm />
      <br />
      <br />
      <PrepareScheduledEventsForm />
      <br />
      <hr />
      <br />
      <ScheduledEventList />
    </main>
  );
}

export default PopulateEventSchedule;
