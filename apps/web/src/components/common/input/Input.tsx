import { Controller, PathValue } from "react-hook-form";

import { Control, FieldValues, RegisterOptions, Path } from "react-hook-form";


interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  className?: string;
  defaultValue?: PathValue<T, Path<T>>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  readonly?: boolean;
  rules?: RegisterOptions;
  labelPlacement?: "outside" | "inside";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    control,
    name,
    className = "",
    defaultValue,
    label,
    placeholder = "",
    isRequired = false,
    readonly = false,
    rules = {},
    labelPlacement = "outside",
    onChange: customOnChange
  } = props || {};

  return (
    <div className={`flex flex-col ${className}`}>
      {label && labelPlacement === "outside" && (
        <label htmlFor={name} className="mb-1 font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: isRequired ? `${label} is required` : false,
          ...rules,
          deps: rules?.deps as Path<T> | Path<T>[] | undefined,
        }}
        render={({
          field: { onChange, value = "", ...rest },
          fieldState: { error },
        }) => (
          <div className="relative items-center">
            <input
              {...rest}
              value={value}
              onChange={(e) => {
                onChange(e); 
                if (customOnChange) customOnChange(e); 
              }}
              id={name}
              placeholder={placeholder}
              readOnly={readonly}
              className={`border p-2 w-full rounded-md 
                ${error ? "border-red-500" : "border-gray-300"}
              `}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Input;
