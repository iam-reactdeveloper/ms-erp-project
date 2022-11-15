import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const RadioForm = ({ value, setValue, radioArray, formLabel,disabled}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl>
      <FormLabel id="radio-form-erp">
        {formLabel}
      </FormLabel>
      <RadioGroup
        value={value}
        onChange={handleChange}
        sx={{ flexDirection: "row" }}
      >
        {radioArray?.map((e, i) => {
          return (
            <FormControlLabel
              value={e.value}
              key={i}
              control={<Radio/>}
              label={e.label}
              disabled={disabled}
           />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
