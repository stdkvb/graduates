import { Link as RouterLink } from "react-router-dom";
import { Container, Paper, Stack, Typography, Button } from "@mui/material";

import PersonalData from "../components/PersonalData";
import ChangePassword from "../components/ChangePassword";

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
      <PersonalData />
      <ChangePassword />
      <Paper
        component="form"
        elevation={0}
        sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography component="h2" variant="h5">
          Есть вопросы?
        </Typography>
        <Typography color="text.secondary">
          Заполните форму и наш администратор свяжется с вами
        </Typography>
        <Button
          component={RouterLink}
          to="/help"
          variant="contained"
          sx={{ width: "400px" }}
        >
          Задать вопрос
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
