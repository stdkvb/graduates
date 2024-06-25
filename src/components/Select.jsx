import { useEffect, useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";

const CustomSelect = ({
  name,
  label,
  options,
  multiple,
  defaultValue,
  readOnly,
  required,
  size,
}) => {
  const [checkedOptions, setCheckedOptions] = useState(
    readOnly ? [defaultValue] : []
  );

  useEffect(() => {
    setCheckedOptions([defaultValue]);
  }, [defaultValue]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCheckedOptions(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: "100%" }} required={readOnly ? false : required}>
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
            size={size}
            label={label}
            sx={{
              [`& .MuiInputBase-input`]: {
                whiteSpace: "break-spaces !important",
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
  );
};

export default CustomSelect;
