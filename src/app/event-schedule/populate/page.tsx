import { PopulateScheduledEventForm } from "./populate-scheduled-event-form";
import { EditScheduledEventList } from "@/app/scheduled-event/edit-scheduled-event-list";
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
      <EditScheduledEventList />
    </main>
  );
}

export default PopulateEventSchedule;
