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

export type EditScheduledEventFormProps = {
  index: number;
  scheduledEvent: ScheduledEvent;
};

const scheduledEventSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
  description: zodString(),
  scheduledEventType: zodString(),
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
    dispatch(updateScheduledEvent({ index, scheduledEvent }));
  };

  const handleRemove = async (index: number) => {
    dispatch(removeScheduledEvent(index));
  };

  return (
    <form onSubmit={handleSubmit((event) => submit(event))}>
      <div className="flex gap-2">
        <button type="submit" className="btn btn-save mt-1">
          <FontAwesomeIcon className="p-1" icon={faCheck} />
        </button>
        <button
          type="button"
          onClick={() => handleRemove(index)}
          className="btn btn-delete mt-1"
        >
          <FontAwesomeIcon className="p-1" icon={faTrash} />
        </button>
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
      </div>
    </form>
  );
};

export { EditScheduledEventForm };
