import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Select = ({ name, label, options }) => {
  return (
    <TextField
      size="medium"
      required
      fullWidth
      name={name}
      select
      label={label}
      InputLabelProps={{ shrink: true }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
