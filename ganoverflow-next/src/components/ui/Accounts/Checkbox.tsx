import { ChangeEvent } from "react";

interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  required,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className="mr-2"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
