import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import CloseIcon from "@mui/icons-material/Close";

import Questionnaire from "../components/Questionnaire";
import Popup from "../components/Popup";

import Api from "../utils/api";

const CreateForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [questionnaire, setQuestionnaire] = useState();

  const getFormProperties = () => {
    Api.get(`/questionnaire/form-properties`, {})
      .then((res) => {
        setLoading(false);
        setQuestionnaire(res.data.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  useEffect(getFormProperties, []);

  //form submit
  const handleSubmit = (e) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    console.log(formData);
    e.preventDefault();
    Api.post(`questionnaire/create`, formData)
      .then((res) => {
        alert("success");
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
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
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
          }}
        />
      ) : (
        <Paper
          component="form"
          elevation={0}
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 4 }}
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography component="h1" variant="h5">
            Создать анкету
          </Typography>
          <Questionnaire data={questionnaire} />
          {error && <Typography color="error.main">{error}</Typography>}
          <Button type="submit" variant="contained" sx={{ width: "180px" }}>
            Сохранить
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default CreateForm;
