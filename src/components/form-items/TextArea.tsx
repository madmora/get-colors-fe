// For more examples https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw?file=/src/index.tsx:2031-2058
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { Rules } from './types'

interface TextAreaProps {
  name: string
  control: any
  label: string
  rules?: Rules
  rows?: number
  disabled?: boolean
}

const TextArea = ({
  name,
  control,
  label,
  rules,
  rows = 4,
  disabled = false,
}: TextAreaProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules || {}}
    render={({ field, fieldState: { error } }) => (
      <>
        <TextField
          {...field}
          helperText={!!error ? error.message : null}
          size="small"
          error={!!error}
          fullWidth
          label={label}
          multiline
          rows={rows}
          disabled={disabled}
        />
      </>
    )}
  />
)

export default TextArea
