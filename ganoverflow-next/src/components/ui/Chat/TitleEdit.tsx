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
    if (name === initialName) {
      setIsEditing(false);
      return;
    }
    if (name.length < 3) {
      alert("세글자 이상의 제목을 입력해주세요.");
      setName(initialName);
      setIsEditing(false);
      return;
    }
    onSave(name);
    setIsEditing(false);
  };

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSaveName();
    }
  };

  return isEditing ? (
    <input
      className="bg-slate-800 text-white w-full px-1 pt-[3px] text-left text-xs"
      type={"text"}
      value={name}
      onChange={onChangeName}
      onKeyDown={handleKeyEnter}
      onBlur={handleSaveName}
      autoFocus
    />
  ) : (
    <div
      className="text-white w-full px-1 pt-[3px] text-xs text-left whitespace-nowrap"
      onDoubleClick={toggleEditing}
    >
      {name.length > 10 ? name.substring(0, 10) + ".." : name}
    </div>
  );
};

export default TitleEdit;
