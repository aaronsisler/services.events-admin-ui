"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zodObject, ZodTypeAny, string as zodString } from "zod";

import { FormField } from "@/app/common/form-field";
import { getClientId, setClientId } from "@/lib/features/common/common-slice";

export type ClientSetData = {
  clientId: string;
};

const clientSchema: ZodTypeAny = zodObject({
  clientId: zodString().min(1, { message: "Required" }),
});

const ClientSet = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientSetData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (clientId: string) => {
    dispatch(setClientId(clientId));
  };

  const clientId = useSelector(getClientId);

  return (
    <React.Fragment>
      <div>Client Id: {clientId || "None"}</div>
      <form
        onSubmit={handleSubmit(({ clientId }: ClientSetData) =>
          onSubmit(clientId)
        )}
      >
        <FormField
          type="text"
          placeholder="Client Id"
          name="clientId"
          register={register}
          error={errors.clientId}
        />
        <br />
        <input
          className="btn btn-blue mt-5"
          type="submit"
          value="Set Client Id"
        />
      </form>
    </React.Fragment>
  );
};

export { ClientSet };
