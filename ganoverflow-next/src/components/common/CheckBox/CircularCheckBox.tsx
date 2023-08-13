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

      <span
        className={`relative  w-6 h-6 rounded-full flex items-center justify-center border-2 border-primary ${
          isChecked ? "bg-primary" : "bg-transparent"
        }`}
      >
        <span className="absolute inset-0 rounded-full flex items-center justify-center">
          <CheckBoxIcon
            style={{
              color: isChecked ? "white" : "rgb(66 200 60)",
              fontSize: "16px",
            }}
          />
        </span>
      </span>
    </label>
  );
};

export default CircularCheckbox;
