import { Container, Paper, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import PersonalData from "../components/PersonalData";

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
    </Container>
  );
};

export default Profile;
