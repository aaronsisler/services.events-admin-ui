"use client";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FormInputField } from "@/app/common/form-input-field";
import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";
import {
  removeScheduledEvent,
  updateScheduledEvent,
} from "@/lib/features/event-schedule/event-schedule-slice";
import { FormSelectField } from "../common/form-select-field";
import { ScheduledEventType } from "@/lib/features/scheduled-event/scheduled-event-type";
import { ScheduledEventInterval } from "@/lib/features/scheduled-event/scheduled-event-interval";
import { ScheduledEventDay } from "@/lib/features/scheduled-event/scheduled-event-day";

export type EditScheduledEventFormProps = {
  index: number;
  scheduledEvent: ScheduledEvent;
};

const scheduledEventSchema: ZodTypeAny = zodObject({
  clientId: zodString(),
  eventId: zodString(),
  eventScheduleId: zodString(),
  locationId: zodString().nullable(),
  organizerId: zodString().nullable(),
  name: zodString().min(1, { message: "Required" }),
  description: zodString(),
  scheduledEventType: zodString(),
  scheduledEventInterval: zodString().nullable(),
  scheduledEventDay: zodString().nullable(),
  category: zodString().nullable(),
  cost: zodString().nullable(),
  startTime: zodString().nullable(),
  endTime: zodString().nullable(),
  scheduledEventDate: zodString().nullable(),
  createdOn: zodString(),
  lastUpdatedOn: zodString(),
});

const EditScheduledEventForm: React.FC<EditScheduledEventFormProps> = ({
  index,
  scheduledEvent,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduledEvent>({
    resolver: zodResolver(scheduledEventSchema),
    values: scheduledEvent,
  });

  const submit = async (scheduledEvent: ScheduledEvent) => {
    console.log("scheduledEvent");
    console.log(scheduledEvent);
    dispatch(updateScheduledEvent({ index, scheduledEvent }));
  };

  const handleRemove = async (index: number) => {
    dispatch(removeScheduledEvent(index));
  };

  return (
    <form onSubmit={handleSubmit((event) => submit(event))}>
      <div className="flex w-1/3 flex-col gap-2">
        <div className="flex">
          <button type="submit" className="btn btn-save mt-1">
            <FontAwesomeIcon className="p-1" icon={faCheck} />
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="btn btn-delete mt-1"
          >
            <FontAwesomeIcon className="p-1" icon={faTrash} />
          </button>
        </div>
        <FormInputField
          type="text"
          placeholder="Scheduled Event Name"
          name="name"
          register={register}
          error={errors.name}
        />
        <FormInputField
          type="text"
          placeholder="Scheduled Event Description"
          name="description"
          register={register}
          error={errors.description}
        />
        <FormSelectField
          name="scheduledEventType"
          selectOptions={Object.values(ScheduledEventType).map(
            (scheduledEventType) => ({
              id: scheduledEventType.valueOf().toString(),
              displayValue: scheduledEventType.toString(),
            })
          )}
          register={register}
          error={errors.scheduledEventType}
          placeholder="Select type"
        />
        <FormSelectField
          name="scheduledEventInterval"
          selectOptions={Object.values(ScheduledEventInterval).map(
            (scheduledEventInterval) => ({
              id: scheduledEventInterval.valueOf().toString(),
              displayValue: scheduledEventInterval.toString(),
            })
          )}
          register={register}
          error={errors.scheduledEventInterval}
          placeholder="Select Scheduled Event Interval"
        />
        <FormSelectField
          name="scheduledEventDay"
          selectOptions={Object.values(ScheduledEventDay).map(
            (scheduledEventDay) => ({
              id: scheduledEventDay.valueOf().toString(),
              displayValue: scheduledEventDay.toString(),
            })
          )}
          register={register}
          error={errors.scheduledEventDay}
          placeholder="Select Scheduled Event Day"
        />
        <FormInputField
          type="text"
          placeholder="Category"
          name="category"
          register={register}
          error={errors.category}
        />
        <FormInputField
          type="text"
          placeholder="Start Time"
          name="startTime"
          register={register}
          error={errors.startTime}
        />
        <FormInputField
          type="text"
          placeholder="End Time"
          name="endTime"
          register={register}
          error={errors.endTime}
        />
        <FormInputField
          type="text"
          placeholder="Scheduled Event Date"
          name="scheduledEventDate"
          register={register}
          error={errors.scheduledEventDate}
        />
        <FormInputField
          type="text"
          placeholder="Cost"
          name="cost"
          register={register}
          error={errors.cost}
        />
        <span>{scheduledEvent.createdOn}</span>
        <span>{scheduledEvent.lastUpdatedOn}</span>
      </div>
    </form>
  );
};

export { EditScheduledEventForm };
