import { useForm } from "react-hook-form";
import { useId } from "react";

import { ClientDto } from "./client-dto";

interface ClientFormProps {
  createClient(name: string): void;
}

const ClientForm = ({ createClient }: ClientFormProps) => {
  const { register, handleSubmit, reset } = useForm();

  const nameInputId = useId();

  const onSubmit = ({ name }: ClientDto) => {
    createClient(name);
    reset();
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
