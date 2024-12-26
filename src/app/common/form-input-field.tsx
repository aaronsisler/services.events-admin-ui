import { FieldError, UseFormRegister } from "react-hook-form";

export type FormInputFieldProps = {
  name: ValidFieldNames;
  onBlur?: any;
  placeholder: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
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
  onBlur,
  placeholder,
  register,
  error,
}) => (
  <>
    <input
      className="ml-1 mb-3 border-2 border-slate-300"
      type="text"
      placeholder={placeholder}
      {...register(name, {
        onBlur,
      })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);

export { FormInputField };
