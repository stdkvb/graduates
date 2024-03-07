import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ru";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({ label, name, defaultValue, required }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DatePicker
        label={label}
        name={name}
        isRequired={required}
        defaultValueValue={defaultValue}
        sx={{ width: "100%" }}
        slotProps={{
          textField: {
            InputLabelProps: { shrink: true },
            size: "medium",
            required: required,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
