// For more examples https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw?file=/src/index.tsx:2031-2058
import { Controller, FieldError } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { Rules } from './types'
import { InputProps } from '@mui/material'
import Primitives from 'primitives'
import defaultTheme from 'lib/theme/default'
import { hasData } from 'utils'

type InputType = 'text' | 'password' | 'number'

interface InternalError {
  pattern: string
}

interface InputTextProps {
  name: string
  control: any
  label: string
  rules?: Rules
  type?: InputType
  disabled?: boolean
  externalError?: boolean
  externalErrorMessage?: string
  icon?: InputProps
  internalError?: InternalError
  errorCallback?: (error: FieldError) => void
  onChangeCallback?: () => void
}

const InputText = ({
  name,
  control,
  label,
  rules,
  type,
  icon,
  disabled,
  externalError,
  externalErrorMessage,
  internalError,
  errorCallback,
  onChangeCallback,
}: InputTextProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules || {}}
    render={({ field: { onChange, ...field }, fieldState: { error } }) => (
      <>
        <TextField
          {...field}
          helperText={!!error ? error.message : null}
          size="small"
          error={!!error || externalError}
          fullWidth
          label={label}
          variant="outlined"
          type={type || 'text'}
          disabled={disabled}
          InputProps={icon}
          inputProps={rules?.maxLength ? { maxLength: rules.maxLength } : {}}
          onChange={(e) => {
            onChange(e)
            onChangeCallback && onChangeCallback()
          }}
        />

        {externalError && externalErrorMessage && (
          <Primitives.Text color={defaultTheme.colors.error} fontSize={1}>
            {externalErrorMessage}
          </Primitives.Text>
        )}

        {error &&
          error.type === 'pattern' &&
          hasData(internalError) &&
          internalError?.pattern && (
            <Primitives.Text color={defaultTheme.colors.error} fontSize={1}>
              {internalError.pattern}
            </Primitives.Text>
          )}

        {!!error && errorCallback && errorCallback(error)}

        {/* 
          Example about how to add additional error messages
          {error && error.type === "required" && <span>This is required</span>}
          {error && error.type === "maxLength" && <span>Max length exceeded</span>} 
          */}
      </>
    )}
  />
)

export default InputText
