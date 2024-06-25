import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";

import Questionnaire from "../components/Questionnaire";
import ChangeHistory from "../components/ChangeHistory";

import Api from "../utils/api";

const Person = () => {
  let { personId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [personData, setPersonData] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const getPersonData = () => {
    Api.get(`/questionnaire/${personId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setLoading(false);
        setPersonData(res.data.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  useEffect(getPersonData, []);

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
            elevation={0}
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 4 }}
          >
            <Typography component="h1" variant="h5">
              Анкета выпускника
            </Typography>
            <Typography>
              Дата последнего редактирования: {personData.changeDate}
            </Typography>
            <Questionnaire defaultValues={personData} />
            <ChangeHistory personId={personId} />
          </Paper>
        )}
      </Container>
    </>
  );
};

export default Person;
