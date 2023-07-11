import { ChatSavedStatus } from "@/app/chat/page";

interface CheckboxProps {
  isDisabled: ChatSavedStatus;
  isChecked: boolean;
  onChangeCheckBox: (isChecked: boolean) => void;
}

export default CheckboxProps;
