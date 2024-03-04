import { useContext, useState, useRef } from "react";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";

import { UserContext } from "../App";

import ValidatedTextField from "./ValidatedTextField";
import ValidatedPhoneField from "./ValidatedPhoneField";

import Api from "../utils/api";

const PersonalData = () => {
  //current user
  const user = useContext(UserContext);

  //form validation
  const textValidator = (value) => {
    if (value.length < 1) return "Обязательное поле";
    return false;
  };

  const phoneValidator = (value) => {
    if (
      !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        value
      )
    )
      return "Введите корректный номер телефона";
    return false;
  };

  const emailValidator = (value) => {
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
      return "Введите корректный email";
    return false;
  };

  //form submit
  const handleSubmit = (e) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    if (e.target.checkValidity()) {
      Api.post(`user/change`, formData)
        .then((res) => {})
        .catch((error) => console.log(error));
    } else {
      alert("Заполните обязательные поля");
    }
  };

  //edit personal data
  const [isEditable, setIsEditable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
      noValidate
    >
      <Typography component="h2" variant="h5">
        Личные данные
      </Typography>
      <Grid container spacing={2} maxWidth="1248px">
        <Grid item xs={4}>
          <ValidatedTextField
            label="Имя"
            name="name"
            dataValue={user.name}
            validator={textValidator}
            isEditable={isEditable}
            onChange={() => {
              setIsEdited(true);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <ValidatedTextField
            label="Фамилия"
            name="lastName"
            dataValue={user.lastName}
            validator={textValidator}
            isEditable={isEditable}
            onChange={() => {
              setIsEdited(true);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <ValidatedTextField
            label="Отчество"
            name="secondName"
            dataValue={user.secondName}
            validator={textValidator}
            isEditable={isEditable}
            onChange={() => {
              setIsEdited(true);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <ValidatedPhoneField
            label="Телефон"
            name="phone"
            dataValue={user.phone}
            validator={phoneValidator}
            isEditable={isEditable}
            onChange={() => {
              setIsEdited(true);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <ValidatedTextField
            label="Email"
            name="email"
            dataValue={user.email}
            validator={emailValidator}
            isEditable={isEditable}
            onChange={() => {
              setIsEdited(true);
            }}
          />
        </Grid>
      </Grid>
      {isEditable ? (
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "400px" }}
          disabled={!isEdited}
        >
          Сохранить
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ width: "400px" }}
          onClick={(e) => {
            e.preventDefault();
            setIsEditable(true);
          }}
        >
          Редактировать
        </Button>
      )}
    </Paper>
  );
};

export default PersonalData;
