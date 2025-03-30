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

const Search = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    control,
    name,
    className = "",
    defaultValue,
    label,
    placeholder = "🔎 Search Here ",
    isRequired = false,
    readonly = false,
    rules = {},
    labelPlacement = "outside",
    onChange: customOnChange,
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
              className={`p-2 w-full rounded-full drop-shadow-sm shadow-sm bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl 
                ${error ? "border-red-500" : "border-gray-300"}
              `}
            />
        )}
      />
    </div>
  );
};

export default Search;
