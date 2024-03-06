import { useContext, useState, useEffect } from "react";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import PasswordInput from "./PasswordInput";
import Popup from "./Popup";

import Api from "../utils/api";

const ChangePassword = () => {
  //query errors
  const [error, setError] = useState();

  //form validation
  const passwordValidator = (value) => {
    if (value.length < 6) return "Пароль должен содержать не менее 6 символов";
    return false;
  };

  //form submit
  const handleSubmit = (e) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    if (e.target.checkValidity()) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Введеные пароли не совпадают");
      } else {
        Api.post(`user/change-password`, formData)
          .then(() => {
            setIsSuccess(true);
            setError();
          })
          .catch((error) => setError(error.response.data.message));
      }
    } else {
      alert("Заполните обязательные поля");
    }
  };

  //success popup
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <Paper
        component="form"
        elevation={0}
        sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography component="h2" variant="h5">
          Сменить пароль
        </Typography>
        <Grid container spacing={2} rowSpacing={4} maxWidth="1248px">
          <Grid item xs={4}>
            <PasswordInput label="Текущий пароль" name="oldPassword" />
          </Grid>
          <Grid item xs={4}>
            <PasswordInput
              label="Введите новый пароль"
              name="newPassword"
              validator={passwordValidator}
            />
          </Grid>
          <Grid item xs={4}>
            <PasswordInput
              label="Повторите новый пароль"
              name="confirmPassword"
              validator={passwordValidator}
            />
          </Grid>
        </Grid>
        {error && <Typography color="error.main">{error}</Typography>}
        <Button type="submit" variant="contained" sx={{ width: "400px" }}>
          Сохранить
        </Button>
      </Paper>
      <Popup isPopupOpen={isSuccess}>
        <IconButton
          onClick={() => {
            setIsSuccess(false);
          }}
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
          Успешно
        </Typography>
        <Typography color="text.secondary">Пароль изменён</Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default ChangePassword;
