import { PopulateEventScheduleForm } from "./populate-event-schedule";
import { EditScheduledEventList } from "@/app/scheduled-event/edit-scheduled-event-list";

function PopulateEventSchedule() {
  return (
    <main>
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
