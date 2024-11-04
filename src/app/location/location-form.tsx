"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "../common/form-field";
import { useErrorStore, ErrorState } from "../common/error-store";
import { Client } from "../client/client";
import { ClientState, useClientStore } from "../client/client-store";
import { Location } from "./location";
import { LocationRepository } from "./location-repository";
import { LocationState, useLocationStore } from "./location-store";

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
    reset,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const addLocation = useLocationStore(
    (state: LocationState) => state.addLocation
  );
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  const onSubmit = async (name: string) => {
    clearErrorMessage();
    try {
      const location: Location = await LocationRepository.create({
        name,
        clientId: client?.clientId,
      });
      addLocation(location);
      reset();
    } catch (error: any) {
      setErrorMessage(error);
    }
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
