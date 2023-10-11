import { Controller, FieldError } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Rules } from "./types";
import Primitives from "primitives";
import { hasData } from "utils";
import defaultTheme from "lib/theme/default";

interface InternalError {
  pattern?: string;
  validate?: string;
}

interface InputTextProps {
  name: string;
  control: any;
  label: string;
  rules?: Rules;
  disable?: boolean;
  errorCallback?: (error: FieldError) => void;
  defaultValue: Dayjs;
  internalError?: InternalError;
}

const InputText = ({
  name,
  control,
  label,
  rules,
  disable,
  errorCallback,
  defaultValue = dayjs(),
  internalError,
}: InputTextProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules || {}}
    render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
      <>
        <DatePicker
          defaultValue={defaultValue}
          label={label}
          onChange={onChange}
          value={value}
          inputRef={ref}
          disableFuture
          slots={{
            textField: ({ value, InputProps, onClick, ...props }) => (
              <>
                <TextField
                  {...props}
                  value={value}
                  helperText={error?.message || null}
                  size="small"
                  error={!!error}
                  fullWidth
                  variant="outlined"
                  disabled={disable}
                  InputProps={InputProps}
                  onClick={onClick}
                />
              </>
            ),
          }}
        />

        {error &&
          error.type === "validate" &&
          hasData(internalError) &&
          internalError?.validate && (
            <Primitives.Text color={defaultTheme.colors.error} fontSize={1}>
              {internalError.validate}
            </Primitives.Text>
          )}

        {!!error && errorCallback && errorCallback(error)}
      </>
    )}
  />
);

export default InputText;
