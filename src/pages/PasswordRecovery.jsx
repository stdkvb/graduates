import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import Api from "../utils/api";
import Popup from "../components/Popup";

import TextInput from "../components/TextInput";

const PasswordRecovery = () => {
  //query errors
  const [error, setError] = useState();

  //form
  const emailValidator = (value) => {
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
      return "Введите корректный email";
    return false;
  };

  const handleSubmit = (e) => {
    setError();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    Api.post(`auth/recovery-pass-start`, formData)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => setError(error.response.data));
  };

  //success popup
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
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
          sx={{ mb: 1, textAlign: "left" }}
        >
          Забыли пароль
        </Typography>
        <Typography sx={{ mb: 2, textAlign: "left" }} color="text.secondary">
          Мы отправим код подтверждения вам на почту
        </Typography>
        <TextInput
          label="Email"
          name="email"
          defaultValue=""
          validator={emailValidator}
          isEditable={true}
        />
        {error && <Typography color="error.main">{error.message}</Typography>}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Отправить
        </Button>
      </Box>
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
          На указанную электронную почту навправлено письмо, для восстановления
          пароля, пожалуйста, пройдите по ссылке в письме.
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

export default PasswordRecovery;
