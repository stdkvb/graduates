import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const CustomSelect = ({
  name,
  label,
  options,
  multiple,
  defaultValue,
  readOnly,
  required,
}) => {
  const [checkedOptions, setCheckedOptions] = React.useState(
    readOnly ? [defaultValue] : []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCheckedOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl
        sx={{ width: "100%" }}
        required={readOnly ? false : required}
      >
        <InputLabel
          id="demo-multiple-checkbox-label"
          shrink
          sx={{ background: "white" }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={multiple}
          value={checkedOptions}
          onChange={handleChange}
          name={name}
          input={
            <OutlinedInput
              label={label}
              sx={{
                [`& .MuiInputBase-input`]: {
                  whiteSpace: "break-spaces",
                },
              }}
            />
          }
          renderValue={(selected) => selected.join(", ")}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
          disabled={readOnly}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={
                multiple
                  ? { p: 0, whiteSpace: "break-spaces" }
                  : { whiteSpace: "break-spaces" }
              }
            >
              {multiple && (
                <Checkbox checked={checkedOptions.indexOf(option) > -1} />
              )}
              <ListItemText primary={option} sx={{ pr: 1 }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomSelect;
