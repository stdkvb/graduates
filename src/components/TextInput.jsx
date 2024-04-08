import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const TextInput = ({
  name,
  label,
  defaultValue,
  validator,
  readOnly,
  multiline,
  required,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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
      required={readOnly ? false : required}
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      disabled={readOnly}
      multiline={multiline}
      minRows={4}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default TextInput;
