import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Box } from "@mui/material";
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
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [readOnly, setIsReadOnly] = useState(false);

  function addDefaultValuesToForm(questionnaire, defaultValues) {
    // Create a new array to store the modified questionnaire
    const newQuestionnaire = [];

    questionnaire.forEach((group, groupIndex) => {
      // Check if group is an array
      if (Array.isArray(group)) {
        // Clone the group and fill fields with default values
        const newGroup = group.map((field) => ({ ...field }));
        newGroup.forEach((field) => {
          if (defaultValues.hasOwnProperty(field.name)) {
            field.defaultValue = defaultValues[field.name];
          }
        });
        newQuestionnaire.push(newGroup);
      } else {
        console.log("Group at index", groupIndex, "is not an array:", group);
        // If group is not an array, push it directly to the new questionnaire
        newQuestionnaire.push(group);
      }
    });

    // Add relative fields with default values
    if (defaultValues.relatives.length > 0) {
      const relativeFieldsTemplate = JSON.parse(
        JSON.stringify(questionnaire[3])
      ); // Clone the relative fields template
      let processedRelatives = 0;

      defaultValues.relatives.forEach((relativeValues) => {
        const relativeFields = relativeFieldsTemplate.map((field) => {
          const defaultValue =
            relativeValues[field.name.replace(/\[\]/g, "")] || "";
          return { ...field, defaultValue };
        });

        // Insert relative fields into the new questionnaire array after the template
        newQuestionnaire.splice(4, 0, relativeFields);
        processedRelatives++;
      });

      // Check if the number of processed relatives matches the expected length
      if (processedRelatives !== defaultValues.relatives.length) {
        console.error(
          "Error: Processed relatives count does not match expected length."
        );
      }

      // Remove the template from the new questionnaire array
      newQuestionnaire.splice(3, 1);
    }

    return newQuestionnaire;
  }

  //get questions
  const getFormProperties = () => {
    Api.get(`/questionnaire/form-properties`, {}).then((res) => {
      if (defaultValues) {
        setIsReadOnly(true);
        const formWithDefaultValues = addDefaultValuesToForm(
          res.data.data,
          defaultValues
        );
        setQuestionnaire(formWithDefaultValues);
      } else {
        setQuestionnaire(res.data.data);
      }

      setLoading(false);
    });
    // .catch((error) => setError(error.response.data));
  };
  useEffect(getFormProperties, []);

  //add relatives
  const addRelatives = () => {
    // Assuming questionnaire is already initialized and not null
    const relativeFieldsTemplate = JSON.parse(JSON.stringify(questionnaire[3])); // Clone the relative fields template

    const newRelativeFields = relativeFieldsTemplate.map((field) => {
      return { ...field };
    });

    // Create a new copy of the questionnaire array
    const updatedQuestionnaire = [...questionnaire];

    // Insert newRelativeFields at the appropriate index
    updatedQuestionnaire.splice(-3, 0, newRelativeFields);

    // Remove defaultValue from the last added relative
    if (updatedQuestionnaire.length > 0) {
      const lastRelativeIndex = updatedQuestionnaire.findIndex(
        (group) => Array.isArray(group) && group.includes(newRelativeFields[0])
      );
      if (lastRelativeIndex !== -1) {
        updatedQuestionnaire[lastRelativeIndex].forEach((field) => {
          delete field.defaultValue;
        });
      }
    }
    console.log(updatedQuestionnaire);

    // Update the state with the modified questionnaire
    setQuestionnaire(updatedQuestionnaire);
  };

  //add/delete files
  const [selectedFiles, setSelectedFiles] = useState(
    defaultValues ? defaultValues.files : []
  );
  const [deletedFiles, setDeletedFiles] = useState([]);

  const handleAddFile = (event) => {
    const files = selectedFiles.concat(Array.from(event.target.files));
    setSelectedFiles(files);
  };

  const handleDeleteFile = (fileName, fileId) => {
    const files = selectedFiles.filter((name) => {
      return name.name !== fileName;
    });
    setSelectedFiles(files);

    setDeletedFiles(deletedFiles.concat(fileId));
    console.log(deletedFiles.concat(fileId));
  };

  //form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //add id of person for change
    if (defaultValues) {
      formData.append("id", defaultValues.id);
    }
    //add new files to formdata and clear selectedFiles from defaultValues
    const clearedFileList = selectedFiles.filter((obj) => "type" in obj);
    for (let i = 0; i < clearedFileList.length; i++) {
      formData.append(`file${i}`, clearedFileList[i]);
    }
    //add files id list for delete
    if (deletedFiles.length > 0) {
      formData.append("delFileIdList", deletedFiles);
    }

    Api.post(`questionnaire/${defaultValues ? "change" : "create"}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setIsSuccess(true);
        setError();
      })
      .catch((error) => setError(error.response.data.message));
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
                            defaultValue={item.defaultValue}
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
                            defaultValue={item.defaultValue}
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
                            defaultValue={item.defaultValue}
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
                            defaultValue={item.defaultValue}
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
                            defaultValue={item.defaultValue}
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
                            readOnly={readOnly}
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
            {error && (
              <Typography color="error.main" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
            {defaultValues && defaultValues.my ? (
              <Button
                type={readOnly ? "button" : "submit"}
                variant="contained"
                sx={{ width: "180px" }}
                onClick={(e) => {
                  if (readOnly) {
                    e.preventDefault();
                    setIsReadOnly(false);
                  }
                }}
              >
                {readOnly ? "Редактировать" : "Сохранить"}
              </Button>
            ) : (
              <Button type="submit" variant="contained" sx={{ width: "180px" }}>
                Сохранить
              </Button>
            )}
          </Box>
          <Popup isPopupOpen={isSuccess}>
            <IconButton
              onClick={() => {
                // setIsSuccess(false);
                navigate("/");
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
            <Typography color="text.secondary">Анкета сохранена</Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
              onClick={() => {
                // setIsSuccess(false);
                navigate("/");
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
