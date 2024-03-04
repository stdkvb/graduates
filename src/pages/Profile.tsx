import { Container, Paper, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

const Profile = () => {
  return (
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
        Профиль
      </Typography>
      <Paper
        elevation={0}
        sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography component="h2" variant="h5">
          Личные данные
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2}>
          <TextField
            label="Фамилия"
            size="medium"
            id="login"
            name="login"
            fullWidth
            sx={{ mb: 2, width: "400px" }}
            required
            value="name"
          />
          <TextField
            label="Имя"
            size="medium"
            id="login"
            name="login"
            fullWidth
            sx={{ mb: 2, width: "400px" }}
            required
            value="name"
          />
          <TextField
            label="Отчество"
            size="medium"
            id="login"
            name="login"
            fullWidth
            sx={{ mb: 2, width: "400px" }}
            required
            value="name"
          />
          <TextField
            label="Телефон"
            size="medium"
            id="login"
            name="login"
            fullWidth
            sx={{ mb: 2, width: "400px" }}
            required
            value="name"
          />
          <TextField
            label="Email"
            size="medium"
            id="login"
            name="login"
            fullWidth
            sx={{ mb: 2, width: "400px" }}
            required
            value="name"
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
