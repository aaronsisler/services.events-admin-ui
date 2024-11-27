"use client";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "@/app/components/form-field";
import { getClientId } from "@/lib/features/common/common-slice";
import { usePostOrganizersMutation } from "@/lib/features/organizer/organizer-api-slice";

export type OrganizerFormData = {
  name: string;
};

const organizerSchema: ZodTypeAny = zodObject({
  name: zodString().min(1, { message: "Required" }),
});

const OrganizerForm = () => {
  const clientId = useSelector(getClientId);
  const [register] = usePostOrganizersMutation();

  const {
    register: registerFormInput,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizerFormData>({
    resolver: zodResolver(organizerSchema),
  });

  const onSubmit = async (name: string) => {
    await register({ clientId, organizers: [{ clientId, name }] });
  };

  return (
    <form
      onSubmit={handleSubmit(({ name }: OrganizerFormData) => onSubmit(name))}
    >
      <FormField
        type="text"
        placeholder="Organizer Name"
        name="name"
        register={registerFormInput}
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
