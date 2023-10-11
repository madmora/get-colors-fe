import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import BrowserInput from "./components/BrowserInput";

interface InputTextDatePickerProps {
  onChange?: () => void;
}

const InputTextDatePicker = ({ onChange }: InputTextDatePickerProps) => {
  return (
    <DatePicker
      defaultValue={dayjs(new Date())}
      label="Fecha incial"
      onChange={() => onChange && onChange()}
      slots={{ textField: BrowserInput }}
    />
  );
};

export default InputTextDatePicker;
