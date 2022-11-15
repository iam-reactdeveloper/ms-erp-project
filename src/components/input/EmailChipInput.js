import React from "react";

import { MainInputField } from "./Input.Style";

export const EmailChipInput = ({ label, value, onAdd, onDelete, disabled }) => {
  return (
    <MainInputField
      label={label}
      onAdd={onAdd}
      value={value}
      onDelete={onDelete}
      disabled={disabled}
    />
  );
};
