import { EventScheduleForm } from "./event-schedule-form";
import { EventScheduleList } from "./event-schedule-list";

function EventSchedules() {
  return (
    <main>
      <br />
      <EventScheduleForm />
      <br />
      <hr />
      <br />
      <EventScheduleList />
    </main>
  );
}

export default EventSchedules;
