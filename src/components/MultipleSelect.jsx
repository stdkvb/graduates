import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ name, label, options }) {
  const [checkedOptions, setCheckedOptions] = React.useState([]);

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
      <FormControl sx={{ width: "100%" }}>
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
          multiple
          value={checkedOptions}
          onChange={handleChange}
          name={name}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          InputLabelProps={{ shrink: true }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{ p: 0, whiteSpace: "break-spaces" }}
            >
              <Checkbox checked={checkedOptions.indexOf(option) > -1} />
              <ListItemText primary={option} sx={{ pr: 1 }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
