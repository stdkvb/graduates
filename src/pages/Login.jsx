import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";

import TextInput from "../components/TextInput";

const Login = ({ onLoginSubmit, error }) => {
  //get params from url
  const [login, setLogin] = useState("");
  const [urlParams, setUrlParams] = useSearchParams();
  let urlLogin = urlParams.get("login");
  const setLoginFromUrl = () => {
    setLogin(urlLogin);
  };
  useEffect(setLoginFromUrl, []);

  //form validation
  const inputValidator = (value) => {
    if (value.length < 1) return "Обязательное поле";
    return false;
  };

  //form submit
  const handleLoginSubmit = (e) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    onLoginSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleLoginSubmit}
      noValidate
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 6, textAlign: "left" }}>
        Авторизация
      </Typography>
      <TextInput
        label="Email"
        name="login"
        defaultValue={login}
        validator={inputValidator}
        isEditable={true}
      />
      <TextInput
        label="Пароль"
        name="password"
        defaultValue=""
        validator={inputValidator}
        isEditable={true}
      />
      {error && (
        <Typography color="error.main" sx={{ my: 2 }}>
          {error.message}
        </Typography>
      )}
      <Link
        sx={{ mt: 1 }}
        component={RouterLink}
        to="/password-recovery"
        color="primary.main"
      >
        Забыли пароль?
      </Link>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Войти
      </Button>
    </Box>
  );
};

export default Login;
