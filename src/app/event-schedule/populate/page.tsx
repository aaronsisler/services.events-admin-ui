import { PopulateScheduledEventForm } from "./populate-scheduled-event-form";
import { ScheduledEventList } from "@/app/scheduled-event/scheduled-event-list";

function PopulateEventSchedule() {
  return (
    <main>
      <br />
      <br />
      <PopulateScheduledEventForm />
      <br />
      <hr />
      <br />
      <ScheduledEventList />
    </main>
  );
}

export default PopulateEventSchedule;
