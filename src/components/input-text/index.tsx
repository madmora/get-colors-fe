import TextField from '@mui/material/TextField'
import { InputProps } from '@mui/material'

type InputType = 'text' | 'password' | 'number' | 'date'

interface InputTextProps {
  label: string
  type?: InputType
  disable?: boolean
  icon?: InputProps
  onChange?: (value: string) => void
}

const InputText = ({
  label,
  type,
  icon,
  disable,
  onChange,
}: InputTextProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value)
  }

  return (
    <TextField
      size="small"
      fullWidth
      label={label}
      variant="outlined"
      type={type || 'text'}
      disabled={disable}
      InputProps={icon}
      onChange={handleOnChange}
    />
  )
}

export default InputText
