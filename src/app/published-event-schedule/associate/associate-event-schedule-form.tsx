"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormSelectField } from "@/app/common/form-select-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { useGetAllEventSchedulesQuery } from "@/lib/features/event-schedule/event-schedule-api-slice";
import { updatePublishedEventSchedule } from "@/lib/features/published-event-schedule/published-event-schedule-slice";

export type AssociateEventScheduleFormData = {
  eventScheduleId: string;
};

const associateEventScheduleSchema: ZodTypeAny = zodObject({
  eventScheduleId: zodString().min(1, { message: "Required" }),
});

const AssociateEventScheduleForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;
  const { data: eventSchedules } = useGetAllEventSchedulesQuery(clientId, {
    skip: !isClientIdPopulated,
  });

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
  } = useForm<AssociateEventScheduleFormData>({
    resolver: zodResolver(associateEventScheduleSchema),
  });

  const onSubmit = async ({
    eventScheduleId,
  }: AssociateEventScheduleFormData) => {
    dispatch(
      updatePublishedEventSchedule({
        eventScheduleId,
      })
    );
    router.push("/published-event-schedule/submit");
  };

  return (
    <form
      onSubmit={handleSubmit(
        ({ eventScheduleId }: AssociateEventScheduleFormData) =>
          onSubmit({ eventScheduleId })
      )}
    >
      <FormSelectField
        name="eventScheduleId"
        selectOptions={eventSchedules?.map((eventSchedule) => ({
          id: eventSchedule.eventScheduleId,
          displayValue: eventSchedule.name,
        }))}
        register={registerFormInput}
        error={errors.eventScheduleId}
        placeholder="Select event schedule"
      />
      &nbsp;&nbsp;&nbsp;
      <input
        className="btn btn-blue mt-5"
        type="submit"
        value="Associate Event Schedule"
      />
    </form>
  );
};

export { AssociateEventScheduleForm };
