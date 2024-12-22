"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormInputField } from "@/app/common/form-input-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { updatePublishedEventSchedule } from "@/lib/features/published-event-schedule/published-event-schedule-slice";

export type PublishedEventScheduleFormData = {
  clientId: string;
  name: string;
  targetYear: string;
  targetMonth: string;
};

const publishedEventScheduleSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
  targetYear: zodString().min(4, { message: "Required" }),
  targetMonth: zodString().min(1, { message: "Required" }),
});

const PublishedEventScheduleForm = () => {
  const clientId = useSelector(getClientId);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
  } = useForm<PublishedEventScheduleFormData>({
    resolver: zodResolver(publishedEventScheduleSchema),
    defaultValues: {
      name: "Default PES",
      targetYear: "2024",
      targetMonth: "9",
    },
  });

  const onSubmit = async ({
    clientId,
    name,
    targetYear,
    targetMonth,
  }: PublishedEventScheduleFormData) => {
    console.log("Here maybe?");
    dispatch(
      updatePublishedEventSchedule({ clientId, name, targetYear, targetMonth })
    );
    router.push("/published-event-schedule/associate");
  };

  return (
    <form
      onSubmit={handleSubmit(
        ({ name, targetYear, targetMonth }: PublishedEventScheduleFormData) =>
          onSubmit({ clientId, name, targetYear, targetMonth })
      )}
    >
      <FormInputField
        placeholder="Name"
        name="name"
        register={registerFormInput}
        error={errors.name}
      />
      <br />
      <FormInputField
        placeholder="Target Year ex: 2024"
        name="targetYear"
        register={registerFormInput}
        error={errors.targetYear}
      />
      <br />
      <FormInputField
        placeholder="Target Month ex: 09"
        name="targetMonth"
        register={registerFormInput}
        error={errors.targetMonth}
      />
      <br />
      <input
        className="btn btn-blue mt-5"
        type="submit"
        value="Next: Associate Event Schedule"
      />
    </form>
  );
};

export { PublishedEventScheduleForm };
