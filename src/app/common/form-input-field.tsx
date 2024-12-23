import { FieldError, UseFormRegister } from "react-hook-form";

export type FormInputFieldProps = {
  name: ValidFieldNames;
  placeholder: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "name"
  | "description"
  | "category"
  | "cost"
  | "startTime"
  | "endTime"
  | "scheduledEventDate"
  | "targetYear"
  | "targetMonth";

const FormInputField: React.FC<FormInputFieldProps> = ({
  name,
  placeholder,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="ml-1 mb-3 border-2 border-slate-300"
      type="text"
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);

export { FormInputField };
