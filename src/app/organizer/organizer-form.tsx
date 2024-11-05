"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "../common/form-field";
import { useErrorStore, ErrorState } from "../common/error-store";
import { Client } from "../client/client";
import { ClientState, useClientStore } from "../client/client-store";
import { Organizer } from "./organizer";
import { OrganizerRepository } from "./organizer-repository";
import { OrganizerState, useOrganizerStore } from "./organizer-store";

export type OrganizerFormData = {
  name: string;
};

const organizerSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
});

const OrganizerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrganizerFormData>({
    resolver: zodResolver(organizerSchema),
  });

  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );
  const addOrganizer = useOrganizerStore(
    (state: OrganizerState) => state.addOrganizer
  );
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  const onSubmit = async (name: string) => {
    clearErrorMessage();
    try {
      const organizer: Organizer = await OrganizerRepository.create({
        name,
        clientId: client?.clientId,
      });
      addOrganizer(organizer);
      reset();
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(({ name }: OrganizerFormData) => onSubmit(name))}
    >
      <FormField
        type="text"
        placeholder="Organizer Name"
        name="name"
        register={register}
        error={errors.name}
      />
      <br />
      <input
        className="btn btn-blue mt-5"
        type="submit"
        value="Create Organizer"
      />
    </form>
  );
};

export { OrganizerForm };
