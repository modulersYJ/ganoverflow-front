import { useState } from "react";

interface TitleEditProps {
  initialName: string;
  onSave: (newName: string) => void;
}

const TitleEdit: React.FC<TitleEditProps> = ({ initialName, onSave }) => {
  const [name, setName] = useState<string>(initialName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSaveName = () => {
    if (name !== initialName) {
      onSave(name);
    }
    setIsEditing(false);
  };

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSaveName();
    }
  };

  return isEditing ? (
    <input
      className="bg-slate-800 w-10/12 px-1 pt-[3px] text-left text-xs"
      type={"text"}
      value={name}
      onChange={onChangeName}
      onKeyDown={handleKeyEnter}
      onBlur={handleSaveName}
      autoFocus
    />
  ) : (
    <div
      className="w-10/12 px-1 pt-[3px] text-sm text-left"
      onDoubleClick={toggleEditing}
    >
      {name}
    </div>
  );
};

export default TitleEdit;
