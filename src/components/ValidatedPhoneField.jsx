import React, { useState } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const ValidatedPhoneField = ({
  label,
  dataValue,
  validator,
  onChange,
  isEditable,
}) => {
  const [value, setValue] = useState(dataValue);
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
        sx={{ mb: 2 }}
        required={isEditable}
        label={label}
        error={!!error}
        helperText={error}
      />
    </InputMask>
  );
};

export default ValidatedPhoneField;
