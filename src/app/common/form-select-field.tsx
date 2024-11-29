import { FieldError, UseFormRegister } from "react-hook-form";

interface SelectOption {
  id?: string;
  displayValue: string;
}

export type FormSelectFieldProps = {
  name: ValidFieldNames;
  selectOptions: SelectOption[];
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

type ValidFieldNames = "locationId" | "organizerId";

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  name,
  selectOptions,
  register,
  error,
}) => (
  <>
    <select {...register(name)}>
      {selectOptions.map((option, index) => (
        <option key={index} value={option.id}>
          {option.displayValue}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error.message}</span>}
  </>
);

export { FormSelectField };
