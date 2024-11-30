import { FieldError, UseFormRegister } from "react-hook-form";

export type FormInputFieldProps = {
  name: ValidFieldNames;
  placeholder: string;
  register: UseFormRegister<any>;
  type: ValidInputTypes;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "name" | "clientId" | "description" | "category";
export type ValidInputTypes = "text";

const FormInputField: React.FC<FormInputFieldProps> = ({
  name,
  placeholder,
  register,
  type,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="ml-1 mb-3 border-2 border-slate-300"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);

export { FormInputField };
