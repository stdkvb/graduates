import { useContext, useState } from "react";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import { UserContext } from "../utils/context";

import TextInput from "./TextInput";
import PhoneInput from "./PhoneInput";
import Popup from "./Popup";

import Api from "../utils/api";

const PersonalData = () => {
  //current user
  const { user, setUser } = useContext(UserContext);

  //edit personal data
  const [isEditable, setIsEditable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

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
        .then(() => {
          setIsEditable(false);
          setIsSuccess(true);
          setUser(formData);
        })
        .catch((error) => console.log(error));
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
        onSubmit={handleSubmit}
        noValidate
      >
        <Typography component="h2" variant="h5">
          Личные данные
        </Typography>
        <Grid container spacing={2} maxWidth="1248px">
          <Grid item xs={4}>
            <TextInput
              label="Имя"
              name="name"
              defaultValue={user.name}
              validator={textValidator}
              isEditable={isEditable}
              onChange={() => {
                setIsEdited(true);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Фамилия"
              name="lastName"
              defaultValue={user.lastName}
              validator={textValidator}
              isEditable={isEditable}
              onChange={() => {
                setIsEdited(true);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Отчество"
              name="secondName"
              defaultValue={user.secondName}
              validator={textValidator}
              isEditable={isEditable}
              onChange={() => {
                setIsEdited(true);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <PhoneInput
              label="Телефон"
              name="phone"
              defaultValue={user.phone}
              validator={phoneValidator}
              isEditable={isEditable}
              onChange={() => {
                setIsEdited(true);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Email"
              name="email"
              defaultValue={user.email}
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
        <Typography color="text.secondary">
          Личные данные пользователя сохранены
        </Typography>
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

export default PersonalData;
