import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const PhoneInput = ({ name, label, defaultValue = "", readOnly, required }) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const phoneValidator = (value) => {
    if (
      !/^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        value
      )
    )
      return "Введите корректный номер телефона";
    return false;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = phoneValidator(newValue);
    setValue(newValue);
    setError(errorMessage);
  };
  return (
    <InputMask
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={handleChange}
      disabled={readOnly}
    >
      <TextField
        name={name}
        size="medium"
        fullWidth
        required={readOnly ? false : required}
        label={label}
        error={!!error}
        helperText={error}
        InputLabelProps={{ shrink: true }}
      />
    </InputMask>
  );
};

export default PhoneInput;
