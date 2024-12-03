"use client";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormInputField } from "@/app/common/form-input-field";
import { ScheduledEvent } from "@/lib/features/scheduled-event/scheduled-event";
import { updateScheduledEvent } from "@/lib/features/event-schedule/event-schedule-slice";

export type EditScheduledEventFormProps = {
  index: number;
  scheduledEvent: ScheduledEvent;
};

const scheduledEventSchema: ZodTypeAny = zodObject({
  eventId: zodString().min(1, { message: "Required" }),
  clientId: zodString().min(1, { message: "Required" }),
  name: zodString().min(1, { message: "Required" }),
  description: zodString(),
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
        <input type="text" hidden {...register("clientId")} />
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
        <input
          className="btn btn-blue mt-5"
          type="submit"
          value="Save Scheduled Event"
        />
      </div>
    </form>
  );
};

export { EditScheduledEventForm };
