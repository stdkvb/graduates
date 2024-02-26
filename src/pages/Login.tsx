import { FC } from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";

interface Login {
  onLoginSubmit: (arg: object) => void;
  errors: string[];
  message: string;
}

const Login: FC<Login> = ({ onLoginSubmit, errors }) => {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLoginChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLogin((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).validity.valid) {
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLoginSubmit = (event: any) => {
    event.preventDefault;
    onLoginSubmit({ login, password });
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
      {/* {errors.map((error, i) => {
        return (
          <Typography color="error.main" sx={{ my: 2 }} key={i}>
            {error.message}
          </Typography>
        );
      })} */}
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
