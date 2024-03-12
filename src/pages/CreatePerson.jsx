import { Container, Paper, Typography } from "@mui/material";

import Questionnaire from "../components/Questionnaire";

const CreatePerson = () => {
  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
          minHeight: "calc(100vh - 112px)",
        }}
      >
        <Paper
          elevation={0}
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 4 }}
        >
          <Typography component="h1" variant="h5">
            Создать анкету
          </Typography>
          <Questionnaire />
        </Paper>
      </Container>
    </>
  );
};

export default CreatePerson;
