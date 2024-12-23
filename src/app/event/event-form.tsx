"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormInputField } from "@/app/common/form-input-field";
import { FormSelectField } from "@/app/common/form-select-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { usePostEventsMutation } from "@/lib/features/event/event-api-slice";
import { useGetAllLocationsQuery } from "@/lib/features/location/location-api-slice";
import { useGetAllOrganizersQuery } from "@/lib/features/organizer/organizer-api-slice";

export type EventFormData = {
  category: string;
  description: string;
  name: string;
  locationId: string;
  organizerId: string;
};

const eventSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
  description: zodString(),
  category: zodString(),
  locationId: zodString(),
  organizerId: zodString(),
});

const EventForm = () => {
  const clientId = useSelector(getClientId);
  const isClientIdPopulated: boolean = !!clientId;

  const { data: locations } = useGetAllLocationsQuery(clientId, {
    skip: !isClientIdPopulated,
  });
  const { data: organizers } = useGetAllOrganizersQuery(clientId, {
    skip: !isClientIdPopulated,
  });
  const [register, { isError }] = usePostEventsMutation();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async ({
    name,
    description,
    category,
    locationId,
    organizerId,
  }: EventFormData) => {
    const { error } = await register({
      clientId,
      events: [
        {
          clientId,
          name,
          description,
          category,
          locationId: locationId || undefined,
          organizerId: organizerId || undefined,
        },
      ],
    });

    const wasPostSuccessful: boolean = error == undefined;

    // If there is no error during the POST, reset/clear the form
    if (wasPostSuccessful) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(({ ...eventFormData }: EventFormData) =>
        onSubmit({ ...eventFormData })
      )}
    >
      {isError && (
        <React.Fragment>
          <div>Something went wrong during submission!</div>
          <br />
        </React.Fragment>
      )}
      <FormInputField
        placeholder="Event Name"
        name="name"
        register={registerFormInput}
        error={errors.name}
      />
      <br />
      <FormInputField
        placeholder="Event Description"
        name="description"
        register={registerFormInput}
        error={errors.description}
      />
      <br />
      <FormInputField
        placeholder="Event Category"
        name="category"
        register={registerFormInput}
        error={errors.category}
      />
      <br />
      <FormSelectField
        name="locationId"
        selectOptions={locations?.map((location) => ({
          id: location.locationId,
          displayValue: location.name,
        }))}
        register={registerFormInput}
        error={errors.locationId}
        placeholder="Select location"
      />
      <br />
      <FormSelectField
        name="organizerId"
        selectOptions={organizers?.map((organizer) => ({
          id: organizer.organizerId,
          displayValue: organizer.name,
        }))}
        register={registerFormInput}
        error={errors.organizerId}
        placeholder="Select organizer"
      />
      <br />
      <input className="btn btn-blue mt-5" type="submit" value="Create Event" />
    </form>
  );
};

export { EventForm };
