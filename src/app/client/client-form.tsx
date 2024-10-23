"use client";

import { useForm } from "react-hook-form";
import { useId } from "react";

import { Client } from "./client";
import { ClientDto } from "./client-dto";
import { ClientRepository } from "./client-repository";
import { ClientState, useClientStore } from "../state/client-store";
import { useErrorStore, ErrorState } from "../state/error-store";

const ClientForm = () => {
  const addClient = useClientStore((state: ClientState) => state.addClient);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );
  const { register, handleSubmit, reset } = useForm();

  const nameInputId = useId();

  const onSubmit = async ({ name }: ClientDto) => {
    clearErrorMessage();
    try {
      const client: Client = await ClientRepository.create(name);
      addClient(client);
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <form
      className=""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={handleSubmit((data: any) => onSubmit({ ...data }))}
    >
      <input
        id={nameInputId}
        type="text"
        placeholder="Client Name"
        {...register("name")}
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
