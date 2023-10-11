import TextField, { TextFieldProps } from "@mui/material/TextField";

const BrowserInput = ({ ...props }: TextFieldProps) => {
  return <TextField size="small" fullWidth variant="outlined" {...props} />;
};

export default BrowserInput;
