import React, { useState } from "react";
import { TextField } from "@mui/material";

const TextInput = ({
  name,
  label,
  defaultValue,
  validator,
  isEditable,
  multiline,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
  };
  return (
    <TextField
      name={name}
      size="medium"
      fullWidth
      required={isEditable}
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      disabled={!isEditable}
      multiline={multiline}
      minRows={4}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default TextInput;
