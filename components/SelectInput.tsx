import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

type Props = {
  name: string;
  disabled: boolean;
  value: string | undefined;
  defaultValue?: string | undefined;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export const SelectInput = ({
  name,
  value,
  options,
  disabled,
  onChange,
  defaultValue,
}: Props) => {
  return (
    <Select
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue
            defaultValue={defaultValue}
            placeholder={name ? `Select a ${name}` : "Select"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
