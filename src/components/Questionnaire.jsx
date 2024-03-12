import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import TextInput from "../components/TextInput";
import PhoneInput from "../components/PhoneInput";
import CustomSelect from "../components/Select";
import DateInput from "../components/DateInput";
import FileInput from "../components/FileInput";
import Popup from "../components/Popup";

import Api from "../utils/api";

const Questionnaire = ({ defaultValues }) => {
  const [questionnaire, setQuestionnaire] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [readOnly, setIsReadOnly] = useState(false);

  //get questions
  const getFormProperties = () => {
    Api.get(`/questionnaire/form-properties`, {}).then((res) => {
      res.data.data.forEach((obj) => {
        // Find the corresponding value in defaultValue using the key from the current object
        const defaultValue = defaultValues[obj.key];
        console.log(defaultValue);

        // Add the defaultValue to the current object
        obj.defaultValue = defaultValue;
      });
      setQuestionnaire(res.data.data);
      setLoading(false);
    });
    // .catch((error) => setError(error.response.data));
  };
  useEffect(getFormProperties, []);
  console.log(defaultValues);
  console.log(questionnaire);

  //add relatives
  const addRelatives = () => {
    const relative = questionnaire[3];
    setProperties(questionnaire.splice(-3, 0, relative));
  };

  //add/delete files
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleAddFile = (event) => {
    const files = selectedFiles.concat(Array.from(event.target.files));
    setSelectedFiles(files);
  };

  const handleDeleteFile = (fileName) => {
    const files = selectedFiles.filter((name) => {
      return name.name !== fileName;
    });
    setSelectedFiles(files);
  };

  //form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = Object.fromEntries(new FormData(e.currentTarget));
    const formData = new FormData(e.currentTarget);
    //add files to formdata
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`file${i}`, selectedFiles[i]);
    }
    console.log(formData);
    Api.post(`questionnaire/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setIsSuccess(true);
      setError();
    });
    // .catch((error) => setError(error.response.data.message));
  };

  return (
    <>
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
        <>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {questionnaire.map((group, i) => {
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
                            defaultValue={item.value}
                            required={item.required}
                            readOnly={readOnly}
                          />
                        </Grid>
                      );
                    }
                    if (item.type == "phone") {
                      return (
                        <Grid key={i} item xs={6}>
                          <PhoneInput
                            label={item.title}
                            name={item.name}
                            defaultValue={item.value}
                            required={item.required}
                            readOnly={readOnly}
                          />
                        </Grid>
                      );
                    }
                    if (item.type == "select") {
                      return (
                        <Grid key={i} item xs={6}>
                          <CustomSelect
                            label={item.title}
                            name={item.name}
                            options={item.value}
                            required={item.required}
                            multiple={item.multiple}
                            defaultValue={item.value}
                            readOnly={readOnly}
                          />
                        </Grid>
                      );
                    }
                    if (item.type == "calendar") {
                      return (
                        <Grid key={i} item xs={6}>
                          <DateInput
                            label={item.title}
                            name={item.name}
                            defaultValue={item.value}
                            required={item.required}
                            readOnly={readOnly}
                          />
                        </Grid>
                      );
                    }
                    if (item.type == "textarea") {
                      return (
                        <Grid key={i} item xs={12}>
                          <TextInput
                            label={item.title}
                            name={item.name}
                            required={item.required}
                            multiline={true}
                            readOnly={readOnly}
                          />
                        </Grid>
                      );
                    }
                    if (item.type == "file") {
                      return (
                        <Grid key={i} item xs={12}>
                          <FileInput
                            name={item.name}
                            selectedFiles={selectedFiles}
                            handleAddFile={handleAddFile}
                            handleDeleteFile={handleDeleteFile}
                          />
                        </Grid>
                      );
                    }
                  })}
                  {i == questionnaire.length - 4 && !readOnly && (
                    <Grid item xs={12}>
                      <Button onClick={addRelatives} variant="text">
                        <AddIcon sx={{ mr: 1 }} />
                        Добавить родственника
                      </Button>
                    </Grid>
                  )}
                </Grid>
              );
            })}
            {error && <Typography color="error.main">{error}</Typography>}
            <Button type="submit" variant="contained" sx={{ width: "180px" }}>
              Сохранить
            </Button>
          </Box>
          <Popup isPopupOpen={isSuccess}>
            <IconButton
              onClick={() => {
                setIsSuccess(false);
              }}
              sx={{
                position: "absolute",
                right: 2,
                top: 2,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" mb={3} sx={{ maxWidth: "90%" }}>
              Успешно
            </Typography>
            <Typography color="text.secondary">Анкета создана</Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
              onClick={() => {
                setIsSuccess(false);
              }}
            >
              Закрыть
            </Button>
          </Popup>
        </>
      )}
    </>
  );
};

export default Questionnaire;
