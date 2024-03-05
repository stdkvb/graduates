import React, { useState } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const PhoneInput = ({
  label,
  defaultValue,
  validator,
  onChange,
  isEditable,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
    onChange(!errorMessage);
  };
  return (
    <InputMask
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={handleChange}
      disabled={!isEditable}
    >
      <TextField
        size="medium"
        fullWidth
        required={isEditable}
        label={label}
        error={!!error}
        helperText={error}
        InputLabelProps={{ shrink: true }}
      />
    </InputMask>
  );
};

export default PhoneInput;
