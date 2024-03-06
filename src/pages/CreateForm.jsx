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

import TextInput from "../components/TextInput";
import PhoneInput from "../components/PhoneInput";
import Select from "../components/Select";
import DateInput from "../components/DateInput";
import Popup from "../components/Popup";

import Api from "../utils/api";

const CreateForm = () => {
  const [loading, setLoading] = useState(true);
  const [formProperties, setFormProperties] = useState();

  const getFormProperties = () => {
    Api.get(`/questionnaire/form-properties`, {})
      .then((res) => {
        setLoading(false);
        setFormProperties(res.data.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  useEffect(getFormProperties, []);

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
        >
          <Typography component="h1" variant="h5">
            Создать анкету
          </Typography>
          {formProperties.map((group, i) => {
            return (
              <Grid
                key={i}
                container
                spacing={2}
                maxWidth="1070px"
                sx={{ mb: 2 }}
              >
                {group.map((item, i) => {
                  if (item.type == "input") {
                    return (
                      <Grid key={i} item xs={6}>
                        <TextInput
                          label={item.title}
                          name={item.name}
                          required={true}
                        />
                      </Grid>
                    );
                  }
                  if (item.type == "select") {
                    return (
                      <Grid key={i} item xs={6}>
                        <Select
                          label={item.title}
                          name={item.name}
                          options={item.value}
                        />
                      </Grid>
                    );
                  }
                  if (item.type == "calendar") {
                    return (
                      <Grid key={i} item xs={6}>
                        <DateInput label={item.title} name={item.name} />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            );
          })}
        </Paper>
      )}
    </Container>
  );
};

export default CreateForm;
