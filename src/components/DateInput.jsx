import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ru from "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({ label, name, defaultValue, required, readOnly }) => {
  // Используем useEffect для установки defaultValue в state компонента
  useEffect(() => {
    if (defaultValue) {
      setDateValue(dayjs(defaultValue, "DD.MM.YYYY"));
    } else {
      setDateValue(null);
    }
  }, [defaultValue]);

  const [dateValue, setDateValue] = useState(
    defaultValue ? dayjs(defaultValue, "DD.MM.YYYY") : null
  );

  const handleChange = (date) => {
    setDateValue(date);
  };

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
        value={dateValue}
        onChange={handleChange}
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
