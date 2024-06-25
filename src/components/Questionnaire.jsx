import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
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
  const [relativeFieldsTemplate, setRelativeFieldsTemplate] = useState([]);
  const [assistanceFieldsTemplate, setAssistanceFieldsTemplate] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [readOnly, setIsReadOnly] = useState(false);

  function addDefaultValuesToForm(
    questionnaire,
    defaultValues,
    relativeTemplate,
    assistanceTemplate
  ) {
    // Create a new array to store the modified questionnaire
    const newQuestionnaire = questionnaire.reduce((acc, group) => {
      // Check if group is an array
      if (Array.isArray(group)) {
        // Clone the group and fill fields with default values
        const newGroup = group.map((field) => ({ ...field }));
        newGroup.forEach((field) => {
          if (defaultValues.hasOwnProperty(field.name)) {
            field.defaultValue = defaultValues[field.name];
          }
        });

        // Check if any field in newGroup has defaultValue defined
        const hasDefaultValue = newGroup.some((field) =>
          field.hasOwnProperty("defaultValue")
        );

        if (hasDefaultValue) {
          acc.push(newGroup);
        }
      } else {
        // If group is not an array, push it directly to the new questionnaire
        acc.push(group);
      }

      // Check if the current group matches relativeTemplate or assistanceTemplate
      if (group === relativeTemplate || group === assistanceTemplate) {
        // Add relative or assistance fields with default values
        const template =
          group === relativeTemplate ? relativeTemplate : assistanceTemplate;
        const data =
          group === relativeTemplate
            ? defaultValues.relatives
            : defaultValues.assistanceProvided;

        if (data && data.length > 0) {
          data.forEach((values) => {
            const fields = template.map((field) => ({
              ...field,
              defaultValue: values[field.name.replace(/\[\]/g, "")] || "",
            }));

            // Check if any field in fields has defaultValue defined
            const hasDefaultValue = fields.some((field) =>
              field.hasOwnProperty("defaultValue")
            );

            if (hasDefaultValue) {
              acc.push(fields);
            }
          });
        }
      }

      return acc;
    }, []);

    // console.log(newQuestionnaire);
    return newQuestionnaire;
  }

  //get questions
  const getFormProperties = () => {
    Api.get(`/questionnaire/form-properties`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      const formProperties = res.data.data;

      const relativeTemplate = formProperties[3];
      const assistanceTemplate = formProperties[5];

      setRelativeFieldsTemplate(relativeTemplate);
      setAssistanceFieldsTemplate(assistanceTemplate);

      if (defaultValues) {
        setIsReadOnly(true);

        const formWithDefaultValues = addDefaultValuesToForm(
          formProperties,
          defaultValues,
          relativeTemplate,
          assistanceTemplate
        );
        setQuestionnaire(formWithDefaultValues);
      } else {
        setQuestionnaire(formProperties);
      }

      setLoading(false);
    });
  };
  useEffect(getFormProperties, []);

  //add relatives
  const addRelatives = () => {
    setQuestionnaire((prevQuestionnaire) => {
      console.log(prevQuestionnaire);
      const newRelativeFields = relativeFieldsTemplate.map((field) => {
        const { defaultValue, ...rest } = field;
        return { ...rest };
      });

      const updatedQuestionnaire = [...prevQuestionnaire];

      updatedQuestionnaire.splice(3, 0, newRelativeFields);

      return updatedQuestionnaire;
    });
  };

  //add assistance
  const addAssistance = () => {
    setQuestionnaire((prevQuestionnaire) => {
      const newAssistanceFields = assistanceFieldsTemplate.map((field) => {
        const { defaultValue, ...rest } = field;
        return { ...rest };
      });

      const updatedQuestionnaire = [...prevQuestionnaire];

      updatedQuestionnaire.splice(
        updatedQuestionnaire.length - 2,
        0,
        newAssistanceFields
      );
      console.log(updatedQuestionnaire);
      return updatedQuestionnaire;
    });
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
    // console.log(deletedFiles.concat(fileId));
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
          <Box component="form" onSubmit={handleSubmit}>
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
                  {i == questionnaire.length - 1 && !readOnly && (
                    <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
                      <Button onClick={addRelatives} variant="text">
                        <AddIcon sx={{ mr: 1 }} />
                        Добавить родственника
                      </Button>
                      <Button onClick={addAssistance} variant="text">
                        <AddIcon sx={{ mr: 1 }} />
                        Добавить оказанную помощь
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
            {defaultValues ? (
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
              !defaultValues && (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "180px" }}
                >
                  Сохранить
                </Button>
              )
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
