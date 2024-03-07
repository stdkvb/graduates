import React, { useState } from "react";
import { TextField } from "@mui/material";

const TextInput = ({
  name,
  label,
  defaultValue,
  validator,
  onlyRead,
  multiline,
  required,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");
  const [error, setError] = useState(false);

  //default validator
  const defaultValidator = (value) => {
    if (value.length < 1) return "Обязательное поле";
    return false;
  };

  //email validator
  const emailValidator = (value) => {
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
      return "Введите корректный email";
    return false;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = validator
      ? validator(newValue)
      : name == "email"
      ? emailValidator(newValue)
      : required
      ? defaultValidator(newValue)
      : null;
    setValue(newValue);
    setError(errorMessage);
  };

  return (
    <TextField
      name={name}
      size="medium"
      fullWidth
      required={onlyRead ? false : required}
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      disabled={onlyRead}
      multiline={multiline}
      minRows={4}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default TextInput;
