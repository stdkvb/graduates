import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";

const Login = ({ onLoginSubmit, error }) => {
  //form
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    if (event.target.validity.valid) {
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    onLoginSubmit({ login, password });
  };

  //get params from url
  const [urlParams, setUrlParams] = useSearchParams();
  let urlLogin = urlParams.get("login");
  const setLoginFromUrl = () => {
    setLogin(urlLogin);
  };
  useEffect(setLoginFromUrl, []);

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

      <TextField
        label="Email"
        size="medium"
        fullWidth
        id="login"
        name="login"
        sx={{ mb: 2 }}
        required
        error={loginError}
        helperText={loginError ? "Введите логин" : ""}
        value={login}
        onChange={handleLoginChange}
      />
      <TextField
        label="Пароль"
        size="medium"
        fullWidth
        id="password"
        name="password"
        sx={{ mb: 2 }}
        required
        error={passwordError}
        helperText={passwordError ? "Введите пароль" : ""}
        value={password}
        onChange={handlePasswordChange}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={!(login && password)}
      >
        Войти
      </Button>
    </Box>
  );
};

export default Login;
