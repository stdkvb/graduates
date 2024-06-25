import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Typography } from "@mui/material";

import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";

const Login = ({ onLoginSubmit, error }) => {
  //get params from url
  const [login, setLogin] = useState("");
  const [urlParams, setUrlParams] = useSearchParams();
  let urlLogin = urlParams.get("login");
  const setLoginFromUrl = () => {
    setLogin(urlLogin);
  };
  useEffect(setLoginFromUrl, []);

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
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "left" }}>
        Авторизация
      </Typography>
      <TextInput
        label="Email"
        name="login"
        defaultValue={login}
        required={true}
      />
      <PasswordInput label="Пароль" name="password" />
      {error && <Typography color="error.main">{error.message}</Typography>}
      <Link component={RouterLink} to="/password-recovery" color="primary.main">
        Забыли пароль?
      </Link>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Войти
      </Button>
    </Box>
  );
};

export default Login;
