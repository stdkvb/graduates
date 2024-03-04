import { useContext, useState, useRef } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";

import { UserContext } from "../App";

import ValidatedTextField from "./ValidatedTextField";
import ValidatedPhoneField from "./ValidatedPhoneField";

import Api from "../utils/api";

const PersonalData = () => {
  //current user
  const user = useContext(UserContext);

  const nameValidator = (value) => {
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
      <Stack direction="row" flexWrap="wrap" gap={2}>
        <ValidatedTextField
          label="Имя"
          name="name"
          dataValue={user.name}
          validator={nameValidator}
          isEditable={isEditable}
          onChange={() => {
            setIsEdited(true);
          }}
        />
        <ValidatedTextField
          label="Фамилия"
          name="lastName"
          dataValue={user.lastName}
          validator={nameValidator}
          isEditable={isEditable}
          onChange={() => {
            setIsEdited(true);
          }}
        />
        <ValidatedTextField
          label="Отчество"
          name="secondName"
          dataValue={user.secondName}
          validator={nameValidator}
          isEditable={isEditable}
          onChange={() => {
            setIsEdited(true);
          }}
        />
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
      </Stack>
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
