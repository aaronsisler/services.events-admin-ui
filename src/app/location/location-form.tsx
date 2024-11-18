"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "../components/form-field";

export type LocationFormData = {
  name: string;
};

const locationSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
});

const LocationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const onSubmit = async (name: string) => {
    console.log(name);
  };

  return (
    <form
      onSubmit={handleSubmit(({ name }: LocationFormData) => onSubmit(name))}
    >
      <FormField
        type="text"
        placeholder="Location Name"
        name="name"
        register={register}
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
