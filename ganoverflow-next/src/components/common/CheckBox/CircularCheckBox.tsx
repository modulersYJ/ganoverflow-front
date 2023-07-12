import React, { ChangeEvent } from "react";
import CheckBoxIcon from "@mui/icons-material/Check";

import CheckboxProps from "./interface";

const CircularCheckbox: React.FC<CheckboxProps> = ({
  isDisabled,
  isChecked,
  onChangeCheckBox,
}) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeCheckBox(event.target.checked);
  };

  return (
    <label className="inline-flex items-center mt-4">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={`hidden`}
        disabled={isDisabled === "T" ? true : false}
      />

      <span className="relative  w-6 h-6 rounded-full  bg-gray-200 flex items-center justify-center">
        <span
          className={`absolute inset-0 rounded-full 
          ${
            isChecked ? "bg-blue-500" : "bg-gray-400"
          } flex items-center justify-center
          `}
        >
          <CheckBoxIcon style={{ color: "white", fontSize: "16px" }} />
        </span>
      </span>
    </label>
  );
};

export default CircularCheckbox;
