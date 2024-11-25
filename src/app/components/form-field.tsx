import { FieldError, UseFormRegister } from "react-hook-form";

export type FormFieldProps = {
  type: ValidInputTypes;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "name" | "clientId";
export type ValidInputTypes = "text";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);

export { FormField };
