"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormInputField } from "@/app/common/form-input-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { usePostEventSchedulesMutation } from "@/lib/features/event-schedule/event-schedule-api-slice";
import { setEventScheduleId } from "@/lib/features/event-schedule/event-schedule-slice";

export type EventScheduleFormData = {
  name: string;
  description: string;
};

const eventScheduleSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
  description: zodString(),
});

const EventScheduleForm = () => {
  const clientId = useSelector(getClientId);
  const [register, { isError }] = usePostEventSchedulesMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventScheduleFormData>({
    resolver: zodResolver(eventScheduleSchema),
  });

  const onSubmit = async ({ name, description }: EventScheduleFormData) => {
    const { data: eventSchedules, error } = await register({
      clientId,
      eventSchedules: [{ clientId, name, description }],
    });

    const wasPostSuccessful: boolean = error == undefined;

    // If there is no error during the POST, reset/clear the form
    if (wasPostSuccessful) {
      reset();
    }

    if (eventSchedules != undefined && eventSchedules?.length > 0) {
      const [eventSchedule] = eventSchedules || [];
      dispatch(setEventScheduleId(eventSchedule?.eventScheduleId));
      router.push("/event-schedule/populate");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(({ name, description }: EventScheduleFormData) =>
        onSubmit({ name, description })
      )}
    >
      {isError && (
        <React.Fragment>
          <div>Something went wrong during submission!</div>
          <br />
        </React.Fragment>
      )}
      <FormInputField
        type="text"
        placeholder="Event Schedule Name"
        name="name"
        register={registerFormInput}
        error={errors.name}
      />
      <br />
      <FormInputField
        type="text"
        placeholder="Event Schedule Description"
        name="description"
        register={registerFormInput}
        error={errors.description}
      />
      <br />
      <input
        className="btn btn-blue mt-5"
        type="submit"
        value="Create Event Schedule"
      />
    </form>
  );
};

export { EventScheduleForm };
