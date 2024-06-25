import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

import Api from "../utils/api";

import PasswordInput from "../components/PasswordInput";

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
      .catch((error) => setError(error.response.data.message));
  };

  useEffect(checkCode, []);

  //query errors
  const [error, setError] = useState(null);

  //form validation
  const passwordValidator = (value) => {
    if (value.length < 6) return "Пароль должен содержать не менее 6 символов";
    return false;
  };

  //form submit
  const handleSubmit = (e) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    Object.assign(formData, {
      userId: userId,
      passwordRecoveryCode: passwordRecoveryCode,
    });
    e.preventDefault();
    if (e.target.checkValidity()) {
      if (formData.password !== formData.confirmPassword) {
        setError("Введеные пароли не совпадают");
      } else {
        Api.post(`auth/recovery-pass-finish`, formData)
          .then(() => {
            setError(null);
            navigate("/");
          })
          .catch((error) => setError(error.response.data.message));
      }
    } else {
      alert("Заполните обязательные поля");
    }
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
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, textAlign: { xs: "center", md: "left" } }}
      >
        Сменить пароль
      </Typography>
      <PasswordInput
        label="Новый пароль"
        name="password"
        validator={passwordValidator}
      />
      <PasswordInput
        label="Повторите пароль"
        name="confirmPassword"
        validator={passwordValidator}
      />
      {error && <Typography color="error.main">{error}</Typography>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Восстановить пароль
      </Button>
    </Box>
  );
};

export default NewPassword;
