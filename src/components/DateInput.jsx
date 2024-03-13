import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ru from "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({ label, name, defaultValue, required, readOnly }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={ru}
      localeText={
        ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DatePicker
        disableFuture
        label={label}
        name={name}
        isRequired={readOnly ? false : required}
        format="DD.MM.YYYY"
        defaultValue={defaultValue ? dayjs(defaultValue, "DD/MM/YYYY") : null}
        disabled={readOnly}
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
