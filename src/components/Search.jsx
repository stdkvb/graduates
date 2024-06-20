import { useEffect } from "react";
import { Paper, Stack, Button, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import CustomSelect from "./Select";
import Api from "../utils/api";
import { useState } from "react";

const Search = ({ onSubmit }) => {
  //get filter
  const [filter, setFilter] = useState();
  const getFilter = () => {
    Api.get(`/questionnaire/get-filter`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setFilter(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getFilter, []);
  //search
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.currentTarget);
    onSubmit(params);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        width: "100%",
        overflow: "hidden",
        p: 2,
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack direction="row" width="100%" spacing={2}>
        <Stack
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <SearchIcon
            sx={{ position: "absolute", left: "10px", top: "10px" }}
          />
          <TextField
            name="fio"
            size="small"
            fullWidth
            label="Поиск выпускника"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: {
                paddingLeft: 40,
              },
            }}
          />
        </Stack>
        <Button type="submit" sx={{ width: "180px" }}>
          Поиск
        </Button>
      </Stack>

      {filter &&
        filter.map((item) => (
          <CustomSelect
            label={item.title}
            name={item.name}
            options={item.value}
            required={item.required}
            multiple={item.multiple}
            // defaultValue={item.defaultValue}
            readOnly={false}
            size="small"
          />
        ))}
    </Paper>
  );
};

export default Search;
