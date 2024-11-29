"use client";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "@/app/common/form-field";
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
  const [register] = usePostLocationsMutation();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const onSubmit = async (name: string) => {
    await register({ clientId, locations: [{ clientId, name }] });
  };

  return (
    <form
      onSubmit={handleSubmit(({ name }: LocationFormData) => onSubmit(name))}
    >
      <FormField
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
