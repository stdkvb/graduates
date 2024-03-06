import {
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import { UserContext } from "../utils/context";

import TextInput from "../components/TextInput";
import PhoneInput from "../components/PhoneInput";
import Popup from "../components/Popup";

import Api from "../utils/api";

const Help = () => {
  //current user
  const { user } = useContext(UserContext);

  //form submit
  const handleSubmit = (e) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    if (e.target.checkValidity()) {
      Api.post(`form/help`, formData)
        .then(() => {
          setIsSuccess(true);
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
      <Container
        maxWidth="false"
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Есть вопросы?
        </Typography>
        <Typography color="text.secondary">
          Заполните форму и наш администратор свяжется с вами
        </Typography>
        <Paper
          component="form"
          elevation={0}
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Grid container spacing={2} maxWidth="1248px">
            <Grid item xs={4}>
              <TextInput
                label="Имя"
                name="name"
                defaultValue={`${user.lastName} ${user.name} ${user.secondName}`}
                required={true}
              />
            </Grid>
            <Grid item xs={4}>
              <PhoneInput
                label="Телефон"
                name="phone"
                defaultValue={user.phone}
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                label="Email"
                name="email"
                defaultValue={user.email}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                label="Введите ваш вопрос"
                name="text"
                required={true}
                multiline={true}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ width: "400px" }}>
            Отправить
          </Button>
        </Paper>
      </Container>
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
          В ближайшее время на вашу электронную почту поступит ответ
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

export default Help;
