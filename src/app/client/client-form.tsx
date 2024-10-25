"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { Client } from "./client";
import { ClientRepository } from "./client-repository";
import { FormField } from "../common/form-field";
import { ClientState, useClientStore } from "../store/client-store";
import { useErrorStore, ErrorState } from "../store/error-store";

export type ClientFormData = {
  name: string;
};

const clientSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
});

const ClientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const addClient = useClientStore((state: ClientState) => state.addClient);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  const onSubmit = async ({ name }: Client) => {
    clearErrorMessage();
    try {
      const client: Client = await ClientRepository.create(name);
      addClient(client);
      reset();
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit((client: Client) => onSubmit(client))}>
      <FormField
        type="text"
        placeholder="Client Name"
        name="name"
        register={register}
        error={errors.name}
      />
      <br />
      <input
        className="btn btn-blue mt-5"
        type="submit"
        value="Create Client"
      />
    </form>
  );
};

export { ClientForm };
