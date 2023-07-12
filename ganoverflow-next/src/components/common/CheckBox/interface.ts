import { ChatSavedStatus } from "@/interfaces/chat";

interface CheckboxProps {
  isDisabled: ChatSavedStatus;
  isChecked: boolean;
  onChangeCheckBox: (isChecked: boolean) => void;
}

export default CheckboxProps;
