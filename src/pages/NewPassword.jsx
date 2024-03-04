import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";

import Api from "../utils/api";

const NewPassword = () => {
  //navigate after success
  const navigate = useNavigate();

  //get params from url
  const [urlParams, setUrlParams] = useSearchParams();
  let userId = urlParams.get("userId");
  let passwordRecoveryCode = urlParams.get("passwordRecoveryCode");

  //check code
  const checkCode = () => {
    Api.post(`auth/recovery-pass-check-code`, { userId, passwordRecoveryCode })
      .then(() => {})
      .catch((error) => setError(error.response.data));
  };

  useEffect(checkCode, []);

  //query errors
  const [error, setError] = useState();

  //form
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordValidator = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordErrorError] = useState(false);
  const confirmPasswordValidator = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordErrorError(true);
    } else {
      setConfirmPasswordErrorError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.post(`auth/recovery-pass-finish`, {
      userId,
      passwordRecoveryCode,
      password,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, textAlign: { xs: "center", md: "left" } }}
      >
        Сменить пароль
      </Typography>
      <TextField
        label="Новый пароль"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="password"
        name="password"
        error={passwordError}
        helperText={
          passwordError ? "Пароль должен содержать минимум 6 символов" : ""
        }
        value={password}
        onChange={passwordValidator}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Повторите пароль"
        variant="standard"
        size="medium"
        required
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        error={confirmPasswordError}
        helperText={confirmPasswordError ? "Введенные пароли не совпадают" : ""}
        value={confirmPassword}
        onChange={confirmPasswordValidator}
        sx={{ mb: 2 }}
      />
      {error && (
        <Typography color="error.main" sx={{ my: 2 }}>
          {error.message}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={!password || passwordError || confirmPasswordError}
      >
        Восстановить пароль
      </Button>
    </Box>
  );
};

export default NewPassword;
