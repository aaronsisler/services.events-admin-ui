import { FieldError, UseFormRegister } from "react-hook-form";

interface SelectOption {
  id?: string;
  displayValue: string;
  isDisabled?: boolean;
}

export type FormSelectFieldProps = {
  onChange?: (event: any) => void;
  name: ValidFieldNames;
  selectOptions: SelectOption[] | undefined;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  placeholder?: string;
};

type ValidFieldNames =
  | "locationId"
  | "organizerId"
  | "eventId"
  | "scheduledEventType"
  | "scheduledEventInterval"
  | "scheduledEventDay"
  | "eventScheduleId";

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  name,
  selectOptions = [],
  register,
  onChange,
  error,
}) => (
  <>
    <select
      {...register(name, { onChange })}
      defaultValue={""}
      className="my-2"
    >
      {selectOptions
        .map(({ id, displayValue, isDisabled }, index) => (
          <option key={index} value={id} disabled={isDisabled}>
            {displayValue}
          </option>
        ))
        .concat(
          <option key={-1} value="" disabled={true}>
            Select...
          </option>
        )}
    </select>
    &nbsp;
    {error && <span className="error-message">{error.message}</span>}
  </>
);

export { FormSelectField };
