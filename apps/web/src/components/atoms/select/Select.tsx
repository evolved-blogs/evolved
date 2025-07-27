import { Controller } from "react-hook-form";
import { HeroSelectItem, HeroUISelect } from "@src/components";
const Select = (props: any) => {
  const {
    name,
    control,
    options,
    defaultValue,
    isRequired,
    label,
    onChange: customOnChange,
    placeholder,
    rules,
  } = props || {};

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value, ...rest }, fieldState }) => (
        <HeroUISelect
          placeholder={placeholder}
          value={value}
          onChange={(val) => {
            onChange(val);
            customOnChange?.(val);
          }}
          {...rest}
        >
          {options.map((option: any) => (
            <HeroSelectItem key={option.value}>{option.label}</HeroSelectItem>
          ))}
        </HeroUISelect>
      )}
    />
  );
};

export default Select;
