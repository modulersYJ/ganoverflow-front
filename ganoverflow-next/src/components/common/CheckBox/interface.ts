import { ChatSavedStatus } from "@/atoms/chat";

interface CheckboxProps {
  isDisabled: ChatSavedStatus;
  isChecked: boolean;
  onCheckboxChange: (isChecked: boolean) => void;
}

export default CheckboxProps;
