"use client";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

import { ScheduledEventType } from "@/lib/features/scheduled-event/scheduled-event-type";
import { FormInputField } from "@/app/common/form-input-field";
import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";
import { updateScheduledEvent } from "@/lib/features/event-schedule/event-schedule-slice";
import { FormSelectField } from "../common/form-select-field";
import { ScheduledEventInterval } from "@/lib/features/scheduled-event/scheduled-event-interval";
import { ScheduledEventDay } from "@/lib/features/scheduled-event/scheduled-event-day";

export type EditScheduledEventFormProps = {
  index: number;
  scheduledEvent: ScheduledEvent;
};

const scheduledEventSchema: ZodTypeAny = zodObject({
  eventId: zodString().min(1, { message: "Required" }),
  clientId: zodString().min(1, { message: "Required" }),
  name: zodString().min(1, { message: "Required" }),
  scheduledEventType: zodString().min(1, { message: "Required" }),
  scheduledEventInterval: zodString(),
  scheduledEventDay: zodString(),
  description: zodString(),
}).refine((input) => {
  console.log(input);
  return true;
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
    defaultValues: { ...scheduledEvent },
  });

  const onSubmit = async (scheduledEvent: ScheduledEvent) => {
    dispatch(updateScheduledEvent({ index, scheduledEvent }));
  };

  return (
    <form onSubmit={handleSubmit((event) => onSubmit(event))}>
      <div className="flex gap-2">
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
          placeholder="Select interval"
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
          placeholder="Select day"
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
          placeholder="Scheduled Event Date: YYYY/MM/DD"
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
        <button type="submit" className="btn btn-save mt-1">
          <FontAwesomeIcon className="p-1" icon={faCheck} />
        </button>
        <button type="submit" className="btn btn-delete mt-1">
          <FontAwesomeIcon className="p-1" icon={faTrash} />
        </button>
      </div>
    </form>
  );
};

export { EditScheduledEventForm };
