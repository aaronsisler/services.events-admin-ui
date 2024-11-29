"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "@/app/common/form-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { usePostEventsMutation } from "@/lib/features/event/event-api-slice";

export type EventFormData = {
  name: string;
};

const eventSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
});

const EventForm = () => {
  const clientId = useSelector(getClientId);
  const [register, { isError }] = usePostEventsMutation();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (name: string) => {
    await register({ clientId, events: [{ clientId, name }] });

    // If there is no error during the POST, reset/clear the form
    if (isError) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(({ name }: EventFormData) => onSubmit(name))}>
      {isError && (
        <React.Fragment>
          <div>Something went wrong during submission!</div>
          <br />
        </React.Fragment>
      )}
      <FormField
        type="text"
        placeholder="Event Name"
        name="name"
        register={registerFormInput}
        error={errors.name}
      />
      <br />
      <input className="btn btn-blue mt-5" type="submit" value="Create Event" />
    </form>
  );
};

export { EventForm };
