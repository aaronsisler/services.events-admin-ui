"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormInputField } from "@/app/common/form-input-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { usePostLocationsMutation } from "@/lib/features/location/location-api-slice";

export type LocationFormData = {
  name: string;
};

const locationSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
});

const LocationForm = () => {
  const clientId = useSelector(getClientId);
  const [register, { isError }] = usePostLocationsMutation();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const onSubmit = async (name: string) => {
    const { error } = await register({
      clientId,
      locations: [{ clientId, name }],
    });

    const wasPostSuccessful: boolean = error == undefined;

    // If there is no error during the POST, reset/clear the form
    if (wasPostSuccessful) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(({ name }: LocationFormData) => onSubmit(name))}
    >
      {isError && (
        <React.Fragment>
          <div>Something went wrong during submission!</div>
          <br />
        </React.Fragment>
      )}

      <FormInputField
        type="text"
        placeholder="Location Name"
        name="name"
        register={registerFormInput}
        error={errors.name}
      />
      <br />
      <input
        className="btn btn-blue mt-5"
        type="submit"
        value="Create Location"
      />
    </form>
  );
};

export { LocationForm };
