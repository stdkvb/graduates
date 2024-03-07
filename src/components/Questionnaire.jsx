import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import TextInput from "../components/TextInput";
import PhoneInput from "../components/PhoneInput";
import Select from "../components/Select";
import MultipleSelect from "./MultipleSelect";
import DateInput from "../components/DateInput";

import AddIcon from "@mui/icons-material/Add";

const Questionnaire = ({ data }) => {
  const [properties, setProperties] = useState(data);
  // const [relative, setRelative] = useState(properties[3]);

  const addRelatives = () => {
    const relative = data[3];
    setProperties(data.splice(-3, 0, relative));
  };

  return (
    <>
      {data.map((group, i) => {
        return (
          <Grid key={i} container spacing={2} maxWidth="1070px" sx={{ mb: 2 }}>
            {group.map((item, i) => {
              if (item.type == "input") {
                return (
                  <Grid key={i} item xs={6}>
                    <TextInput
                      label={item.title}
                      name={item.name}
                      required={item.required}
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
                      required={item.required}
                    />
                  </Grid>
                );
              }
              if (item.type == "select") {
                if (item.multiple == false) {
                  return (
                    <Grid key={i} item xs={6}>
                      <Select
                        label={item.title}
                        name={item.name}
                        options={item.value}
                        required={item.required}
                      />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid key={i} item xs={6}>
                      <MultipleSelect
                        label={item.title}
                        name={item.name}
                        options={item.value}
                        required={item.required}
                      />
                    </Grid>
                  );
                }
              }
              if (item.type == "calendar") {
                return (
                  <Grid key={i} item xs={6}>
                    <DateInput
                      label={item.title}
                      name={item.name}
                      required={item.required}
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
                    />
                  </Grid>
                );
              }
            })}
            {i == data.length - 4 && (
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
    </>
  );
};

export default Questionnaire;
