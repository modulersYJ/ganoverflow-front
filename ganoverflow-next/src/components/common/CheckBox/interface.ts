import { ChatSavedStatus } from "@/app/chat/page";

interface CheckboxProps {
  isDisabled: ChatSavedStatus;
  isChecked: boolean;
  onCheckboxChange: (isChecked: boolean) => void;
}

export default CheckboxProps;
