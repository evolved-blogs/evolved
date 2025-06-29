import { DropdownTrigger, Button } from "@heroui/react";
import { DropdownItem, DropdownMenu, HeroUIDropdown } from "@src/components";

export interface DropdownProps {
  label: string;
  items: {
    label: string;
    onClick: () => void;
  }[];
}
const Dropdown = (props: DropdownProps) => {
  const { label, items } = props || {};
  return (
    <HeroUIDropdown>
      <DropdownTrigger>
        <Button variant="bordered">{label}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            onPress={() => item.onClick()}
            className="cursor-pointer"
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </HeroUIDropdown>
  );
};

export default Dropdown;
