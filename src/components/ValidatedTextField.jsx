import React, { useState } from "react";
import { TextField } from "@mui/material";

const ValidatedTextField = ({
  name,
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
    <TextField
      name={name}
      size="medium"
      fullWidth
      sx={{ mb: 2 }}
      required={isEditable}
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      disabled={!isEditable}
    />
  );
};

export default ValidatedTextField;
