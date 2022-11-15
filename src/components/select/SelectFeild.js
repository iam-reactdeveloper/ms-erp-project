import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

import { Wrapper } from "./SelectField.Style";

export const SelectFeild = ({
  label,
  selectedValue,
  options,
  handleChange,
  disabled,
  name,
  selectField,
  errorMessage,
  ...restProps
}) => {
  return (
    <>
      <Wrapper >
        <div className="select-dropdown">
          <FormControl fullWidth>
            <Select
              className={selectField}
              labelId="select-field-erp"
              id="select-erp"
              name={name}
              value={selectedValue}
              placeholder={label}
              onChange={handleChange}
              disabled={disabled}
              {...restProps}
            >
              {options?.map((e, i) => {
                return (
                  <MenuItem value={e?.value} key={i}>
                    {e?.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </Wrapper>
      {errorMessage}
    </>
  );
};
