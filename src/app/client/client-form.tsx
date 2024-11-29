"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "@/app/common/form-field";
import { usePostClientsMutation } from "@/lib/features/client/client-api-slice";

export type ClientFormData = {
  name: string;
};

const clientSchema: ZodTypeAny = zodObject({
  clientId: zodString().min(1, { message: "Required" }),
});

const ClientForm = () => {
  const [register, { isError }] = usePostClientsMutation();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (name: string) => {
    await register({ clients: [{ name }] });

    if (isError) {
      reset();
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(({ name }: ClientFormData) => onSubmit(name))}
      >
        {isError && (
          <React.Fragment>
            <div>Something went wrong during submission!</div>
            <br />
          </React.Fragment>
        )}
        <FormField
          type="text"
          placeholder="Client Name"
          name="name"
          register={registerFormInput}
          error={errors.name}
        />
        <br />
        <input
          className="btn btn-blue mt-5"
          type="submit"
          value="Create Client"
        />
      </form>
    </React.Fragment>
  );
};

export { ClientForm };
