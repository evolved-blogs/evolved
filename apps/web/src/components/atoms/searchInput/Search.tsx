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
    placeholder = "",
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
          <div className="relative items-center">
           <svg className="absolute left-3 top-1/2 w-5 h-5 z-50 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 40 40">
<path fill="#b6c9d6" d="M3.499,38.5c-0.534,0-1.036-0.208-1.414-0.585S1.5,37.035,1.5,36.501s0.208-1.036,0.585-1.414 l18.233-17.382l1.983,1.985L4.904,37.923C4.535,38.292,4.033,38.5,3.499,38.5z"></path><path fill="#788b9c" d="M20.31,18.405l1.293,1.294L4.559,37.561C4.276,37.844,3.899,38,3.499,38 c-0.4,0-0.777-0.156-1.06-0.439c-0.584-0.584-0.584-1.535-0.017-2.103L20.31,18.405 M20.327,17.007L1.732,34.734 c-0.976,0.976-0.976,2.558,0,3.534v0C2.22,38.756,2.859,39,3.499,39c0.64,0,1.279-0.244,1.767-0.732L23,19.683L20.327,17.007 L20.327,17.007z"></path><g><path fill="#d1edff" d="M26,26.5c-6.893,0-12.5-5.607-12.5-12.5S19.107,1.5,26,1.5S38.5,7.107,38.5,14S32.893,26.5,26,26.5z"></path><path fill="#788b9c" d="M26,2c6.617,0,12,5.383,12,12s-5.383,12-12,12s-12-5.383-12-12S19.383,2,26,2 M26,1 c-7.18,0-13,5.82-13,13c0,7.18,5.82,13,13,13s13-5.82,13-13C39,6.82,33.18,1,26,1L26,1z"></path></g>
</svg>      <div className="absolute left-9 top-1/4 z-50">Search </div>
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
          </div>
        )}
      />
    </div>
  );
};

export default Search;
