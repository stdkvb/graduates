import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const PasswordInput = ({ label, name, validator, reset }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  //reset input
  useEffect(() => {
    setValue("");
  }, [reset]);

  //default validator
  const defaultValidator = (value) => {
    if (value.length < 1) return "Обязательное поле";
    return false;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    const errorMessage = validator
      ? validator(newValue)
      : defaultValidator(newValue);
    setValue(newValue);
    setError(errorMessage);
  };

  //password show/hide
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      size="medium"
      fullWidth
      type={showPassword ? "text" : "password"}
      label={label}
      value={value}
      name={name}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      required={true}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
